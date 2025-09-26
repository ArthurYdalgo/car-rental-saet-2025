// /components/StatePicker.tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { nexusProps } from '@laravext/react';

export default function BrandPicker({ value, onChange, placeholder = 'Selecione a marca', selectClassName, triggerClassName, disabled, id, name }) {
    const { brands } = nexusProps();

    return (
        <Select value={value} onValueChange={onChange} className={selectClassName} disabled={disabled} name={name}>
            <SelectTrigger className={triggerClassName} id={id}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {brands.map((brand) => (
                    <SelectItem key={`brand-picker-${brand.id}`} value={`${brand.id}`}>
                        <div className="flex items-center gap-2">{brand.name}</div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
