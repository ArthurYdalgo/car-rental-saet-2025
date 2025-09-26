import { nexusProps } from "@laravext/react";
import { ComboBox, ComboBoxItem } from "./ui/combo-box";


export default function ColorPicker({ value, onChange, placeholder = 'Selecione a cor', disabled, id, name, buttonClassName }) {
    // Get color options from nexusProps (assuming nexusProps is available)
    const { colors } = nexusProps();

    return (
        <ComboBox
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            buttonClassName={buttonClassName}
        >
            {colors.map((color) => (
                <ComboBoxItem
                    key={`color-picker-${color.id}`}
                    value={`${color.id}`} // Use color ID as the value
                    selectedValue={value} // Pass selected value to ComboBoxItem
                    onSelect={(selectedValue) => onChange(selectedValue)} // Pass selected value to onChange
                >
                    <div className="flex items-center gap-2">
                        {color.name} <div className="h-3 w-3 rounded" style={{ backgroundColor: color.hex, border: '1px solid #aaaaaa44' }}></div>
                    </div>
                </ComboBoxItem>
            ))}
        </ComboBox>
    );
}
