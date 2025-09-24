// /components/StatePicker.tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// list of objects with name values for all Brazilian states (value is abreviation)
const VEHICLE_TYPES = [
    { value: 'sedan', name: 'Sedan' },
    { value: 'hatchback', name: 'Hatchback' },
    { value: 'pickup', name: 'Pickup' },
    { value: 'truck', name: 'Caminhão' },
    { value: 'van', name: 'Van' },
];

export default function VehicleTypePicker({ value, onChange, placeholder = 'Selecione o tipo', disabled, id, name }) {
    return (
        <Select value={value} onValueChange={onChange} disabled={disabled} name={name}>
            <SelectTrigger id={id}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {VEHICLE_TYPES.map((vehicleType) => (
                    <SelectItem key={`vehicle-type-picker-${vehicleType.value}`} value={vehicleType.value}>
                        {vehicleType.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
