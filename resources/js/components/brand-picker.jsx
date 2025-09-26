import { ComboBox, ComboBoxItem } from '@/components/ui/combo-box'; // Assuming ComboBox is in this path
import { nexusProps } from '@laravext/react';

export default function BrandPicker({ value, onChange, placeholder = 'Selecione a marca', buttonClassName, disabled, id, name }) {
    const { brands } = nexusProps();

    return (
        <ComboBox value={value} onChange={onChange} placeholder={placeholder} disabled={disabled} buttonClassName={buttonClassName}>
            {brands.map((brand) => (
                <ComboBoxItem key={`brand-picker-${brand.id}`} value={`${brand.id}`} onSelect={onChange} selectedValue={value}>
                    <div className="flex items-center gap-2">{brand.name}</div>
                </ComboBoxItem>
            ))}
        </ComboBox>
    );
}
