// /components/StatePicker.tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { nexusProps } from '@laravext/react';

export default function ColorPicker({ value, onChange, placeholder = 'Selecione a cor', selectClassName, triggerClassName, disabled, id, name }) {
    const { colors } = nexusProps();

    return (
        <Select value={value} className={selectClassName} onValueChange={onChange} disabled={disabled} name={name}>
            <SelectTrigger className={triggerClassName} id={id}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {colors.map((color) => (
                    <SelectItem key={`color-picker-${color.id}`} value={`${color.id}`}>
                        <div className="flex items-center gap-2">
                            {color.name} <div className="h-3 w-3 rounded" style={{ backgroundColor: color.hex, border: '1px solid #aaaaaa44' }}></div>
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
