import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function ComboBox({
  value,
  onChange,
  disableSearch = false,
  searchPlaceholder = "Search...",
  disabled = false,
  buttonClassName = "",
  placeholder = "Select an option...",
  children, // Use children prop for options
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={"w-[200px] justify-between " + buttonClassName}
          disabled={disabled}
        >
          {value
            ? children.find((child) => child.props.value === value)?.props.children
            : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          {!disableSearch && (
            <CommandInput
              placeholder={searchPlaceholder}
              className="h-9 border-2 border-none border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-0 focus:border-input"
            />
          )}
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {children} {/* Render the children directly */}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function ComboBoxItem({ children, value, onSelect, selectedValue }) {
  return (
    <CommandItem
      value={value}
      onSelect={() => onSelect(value === selectedValue ? "" : value)} // Toggle selection
    >
      <div className="flex items-center justify-between w-full">
        {children}
        <Check
          className={cn(
            "ml-auto",
            selectedValue === value ? "opacity-100" : "opacity-0"
          )}
        />
      </div>
    </CommandItem>
  );
}
