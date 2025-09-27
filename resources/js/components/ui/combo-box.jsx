import React, { useEffect, useMemo, useRef, useState } from "react"
import axios from "axios"
import { Check, ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useNonInitialEffect } from "@/hooks/use-non-initial-effect"

/**
 * ComboBox
 *
 * Props:
 * - items, value, onChange, placeholder, searchPlaceholder, buttonClassName (same as before)
 * - searchEndpoint: string | null
 * - parseItem: (raw) => ({ value, label, keywords? })
 * - minChars: number (default 0)
 * - debounceMs: number (default 300)
 * - extraParams: object (merged into query when parseSearch returns an object)
 * - parseSearch: (query) => object | string
 *    • default: (q) => ({ "filter[search]": q })
 *    • if returns object → merged with extraParams and sent via axios `params`
 *    • if returns string → appended to URL like `${endpoint}?${thatString}`
 * - prefetchOptions: boolean (default false)
 *    • when true and `searchEndpoint` is provided, performs an initial fetch on mount
 *    • respects `minChars` (i.e., if query length < minChars, it won’t fetch)
 *    • prevents duplicate fetch on open when the same query has already been prefetched
 * - fetchOnOpen: boolean (default true)
 *    • when false, opening the combobox will NOT trigger a fetch (typing will)
 * - prefetchedOptions: array | null (default null)
 *    • raw items to seed the list (useful for edit forms); normalized via parseItem
 */
export function ComboBox({
  items = [],
  value,
  onChange,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  buttonClassName = "",
  disabled = false,
  searchEndpoint = null,
  parseItem = (item) => ({ value: String(item.id ?? ""), label: item.name ?? "", keywords: [] }),
  minChars = 0,
  debounceMs = 300,
  extraParams = {},
  parseSearch = (q) => ({ "filter[search]": q }), // <-- default here
  prefetchOptions = false,
  fetchOnOpen = false,
  prefetchedOptions = null
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [remoteItems, setRemoteItems] = useState([])
  const abortRef = useRef(null)
  const debounceRef = useRef(null)
  const lastFetchedQueryRef = useRef(null)
  const didPrefetchRef = useRef(false)

  const effectiveItems = useMemo(() => (searchEndpoint ? remoteItems : items), [searchEndpoint, remoteItems, items])

  const currentLabel = useMemo(() => {
    const found = effectiveItems.find((it) => String(it.value) === String(value))
    return found ? found.label : null
  }, [effectiveItems, value])

  const runSearch = async (q) => {
    if (!searchEndpoint) return
    if ((q || "").length < minChars) {
      setRemoteItems([])
      setLoading(false)
      setError(null)
      return
    }

    if (abortRef.current) abortRef.current.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setLoading(true)
    setError(null)
    try {
      const spec = parseSearch(q)

      let res
      if (typeof spec === "string") {
        // dev provided full query string
        const url = spec.trim().length ? `${searchEndpoint}?${spec}` : searchEndpoint
        res = await axios.get(url, { signal: controller.signal })
      } else {
        // dev provided params object – merge with extraParams
        const params = { ...(spec || {}), ...extraParams }
        res = await axios.get(searchEndpoint, { params, signal: controller.signal })
      }

      const raw = res?.data?.data ?? []
      const parsed = raw.map((r) => {
        const p = parseItem(r) || {}
        return {
          value: String(p.value ?? ""),
          label: p.label ?? "",
          keywords: Array.isArray(p.keywords) ? p.keywords : []
        }
      })
      setRemoteItems(parsed)
      lastFetchedQueryRef.current = q
    } catch (err) {
      if (axios.isCancel(err) || err?.name === "CanceledError") {
        // ignore
      } else {
        setError("Failed to fetch results.")
        setRemoteItems([])
      }
    } finally {
      setLoading(false)
    }
  }

  // Debounced search on open/typing
  useNonInitialEffect(() => {
    if (!searchEndpoint || !open) return

    // If we don't want auto-fetch on just opening and user hasn't typed, skip
    if (!fetchOnOpen && query.length === 0) return

    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      // If we already have data for this exact query (from prefetch or prefetchedOptions), skip refetch
      if (
        (prefetchOptions || didPrefetchRef.current) &&
        lastFetchedQueryRef.current === query &&
        (remoteItems?.length ?? 0) > 0
      ) {
        return
      }
      runSearch(query)
    }, debounceMs)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
    // NOTE: do NOT depend on remoteItems length, to avoid re-trigger from setRemoteItems
  }, [query, open, searchEndpoint, debounceMs, prefetchOptions, fetchOnOpen])

  // Abort in-flight request when closing popover
  useNonInitialEffect(() => {
    if (!searchEndpoint) return
    if (!open && abortRef.current) abortRef.current.abort()
  }, [open, searchEndpoint])

  // Optional prefetch on mount or when endpoint changes
  useNonInitialEffect(() => {
    if (!searchEndpoint || !prefetchOptions) return
    ;(async () => {
      await runSearch(query)
      didPrefetchRef.current = true
    })()
  }, [searchEndpoint, prefetchOptions])

  // Seed from prefetchedOptions (useful for edit forms)
  useEffect(() => {
    if (!searchEndpoint) return
    if (!prefetchedOptions || !Array.isArray(prefetchedOptions) || prefetchedOptions.length === 0) return

    const parsed = prefetchedOptions.map((r) => {
      const p = parseItem(r) || {}
      return {
        value: String(p.value ?? ""),
        label: p.label ?? "",
        keywords: Array.isArray(p.keywords) ? p.keywords : []
      }
    })
    setRemoteItems(parsed)
    didPrefetchRef.current = true
    lastFetchedQueryRef.current = "" // seeded for empty query
  }, [searchEndpoint, prefetchedOptions, parseItem])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortRef.current) abortRef.current.abort()
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={"w-[200px] justify-between " + buttonClassName}
        >
          {currentLabel || placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0">
        <Command shouldFilter={!searchEndpoint}>
          <CommandInput
            placeholder={searchPlaceholder}
            className="h-9 border-none focus:ring-0"
            onValueChange={setQuery}
            value={query}
          />
          <CommandList>
            {loading && (
              <CommandGroup>
                <div className="px-3 py-2 text-sm opacity-70">Searching…</div>
              </CommandGroup>
            )}

            {!loading && error && (
              <CommandGroup>
                <div className="px-3 py-2 text-sm text-red-600">{error}</div>
              </CommandGroup>
            )}

            {!loading && !error && effectiveItems.length === 0 && <CommandEmpty>No item found.</CommandEmpty>}

            {!loading && !error && effectiveItems.length > 0 && (
              <CommandGroup>
                {effectiveItems.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={String(item.value)}
                    keywords={
                      typeof item.label === "string"
                        ? [item.label, ...(item.keywords ?? [])]
                        : (item.keywords ?? [])
                    }
                    onSelect={(currentValue) => {
                      const newValue = currentValue === String(value) ? "" : currentValue
                      onChange(newValue)
                      setOpen(false)
                    }}
                  >
                    {item.label}
                    <Check className={`ml-auto ${String(value) === String(item.value) ? "opacity-100" : "opacity-0"}`} />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
