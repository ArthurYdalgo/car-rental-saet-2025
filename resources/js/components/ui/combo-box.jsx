import React, { useEffect, useMemo, useRef, useState } from "react"
import axios from "axios"
import { Check, ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

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
 */
export function ComboBox({
  items = [],
  value,
  onChange,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  buttonClassName = "",
  searchEndpoint = null,
  parseItem = (item) => ({ value: String(item.id ?? ""), label: item.name ?? "", keywords: [] }),
  minChars = 0,
  debounceMs = 300,
  extraParams = {},
  parseSearch = (q) => ({ "filter[search]": q }) // <-- default here
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [remoteItems, setRemoteItems] = useState([])
  const abortRef = useRef(null)
  const debounceRef = useRef(null)

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

  useEffect(() => {
    if (!searchEndpoint || !open) return
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => { runSearch(query) }, debounceMs)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, open, searchEndpoint])

  useEffect(() => {
    if (!searchEndpoint) return
    if (open) runSearch(query)
    else if (abortRef.current) abortRef.current.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, searchEndpoint])

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
