import React, { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function ComboBox ({ items, value, onChange, placeholder = "Select...", searchPlaceholder = "Search...", buttonClassName = "" }) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={"w-[200px] justify-between " + buttonClassName}
        >
          {value
            ? items.find((item) => item.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} className="h-9 border-none focus:ring-0 " />
          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  keywords={typeof item.label === "string" ? [item.label, ...(item.keywords ?? [])] : (item.keywords ?? [])}
                  onSelect={(currentValue) => {
                    const newValue = currentValue === value ? "" : currentValue
                    onChange(newValue)
                    setOpen(false)
                  }}
                >
                  {item.label}
                  <Check
                    className={`ml-auto ${value === item.value ? "opacity-100" : "opacity-0"}`}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}