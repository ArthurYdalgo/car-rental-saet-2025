import { nexusProps } from "@laravext/react";
import { ComboBox, ComboBoxItem } from "./ui/combo-box";


export default function ColorPicker({ value, onChange, placeholder = 'Selecione a cor', disabled, id, name, selectClassName, triggerClassName }) {
    // Get color options from nexusProps (assuming nexusProps is available)
    const { colors } = nexusProps();

    return (
        <ComboBox
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            selectClassName={selectClassName}
            triggerClassName={triggerClassName}
        >
            {colors.map((color) => (
                <ComboBoxItem key={`color-picker-${color.id}`} value={color.id} onSelect={(value) => onChange(value)}>
                    <div className="flex items-center gap-2">
                        {color.name} <div className="h-3 w-3 rounded" style={{ backgroundColor: color.hex, border: '1px solid #aaaaaa44' }}></div>
                    </div>
                </ComboBoxItem>
            ))}
        </ComboBox>
    );
}
