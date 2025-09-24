// /components/StatePicker.tsx
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { nexusProps } from "@laravext/react";

export default function BrandPicker({
  value,
  onChange,
  placeholder = "Selecione a marca",
  disabled,
  id,
  name,
}) {

  const { brands } = nexusProps();

  return (
    <Select value={value} onValueChange={onChange} disabled={disabled} name={name}>
      <SelectTrigger id={id}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {brands.map((brand) => (
          <SelectItem key={`brand-picker-${brand.id}`} value={`${brand.id}`}>
            {brand.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
