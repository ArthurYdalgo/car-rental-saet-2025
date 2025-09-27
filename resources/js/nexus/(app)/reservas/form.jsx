// app/example-form.jsx
import { Input } from '@/components/ui/input';

import { Button } from '@/components/ui/button';

import BrandPicker from '@/components/brand-picker';
import ColorPicker from '@/components/color-picker';
import { FormActions, FormField, FormRow } from '@/components/form-layout';
import VehicleTypePicker from '@/components/vehicle-type-picker';
import CurrencyInput from '@/components/currency-input';
import { ComboBox } from '@/components/ui/combo-box';

export default function CustomerForm({ formHook, onSubmit = (e) => {}, ...props }) {
    return (
        <form onSubmit={onSubmit} className="space-y-8 p-6">
            <FormRow cols={12}>
                <FormField span={4} error={formHook.errors.name} label="Nome" htmlFor="name" required>
                    <ComboBox
                    value={formHook.data.customer_id ? `${formHook.data.customer_id}` : ''}
                    onChange={(value) => formHook.setData('customer_id', value)}
                    searchEndpoint={'/api/customers'}
                        />
                </FormField>
                
                <FormField span={4} error={formHook.errors.license_plate} label="Placa" htmlFor="license_plate" required>
                    <Input
                        id="license_plate"
                        name="license_plate"
                        placeholder="João"
                        required
                        value={formHook.data.license_plate ?? ''}
                        onChange={(e) => formHook.setData('license_plate', e.target.value)}
                    />
                </FormField>
            </FormRow>
          

            <FormActions>
                <Button type="submit">Salvar</Button>
            </FormActions>
        </form>
    );
}
