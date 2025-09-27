// app/example-form.jsx
import { Input } from '@/components/ui/input';

import { Button } from '@/components/ui/button';

import { FormActions, FormField, FormRow } from '@/components/form-layout';
import { ComboBox } from '@/components/ui/combo-box';

export default function CustomerForm({ formHook, onSubmit = (e) => {}, ...props }) {
    return (
        <form onSubmit={onSubmit} className="space-y-8 p-6">
            <FormRow cols={12}>
                <FormField span={4} error={formHook.errors.name} label="Nome" htmlFor="name" required>
                    <ComboBox
                    buttonClassName='w-full'
                        value={formHook.data.customer_id ? `${formHook.data.customer_id}` : ''}
                        onChange={(value) => formHook.setData('customer_id', value)}
                        parseItem={(customer) => ({
                            value: `${customer.id}`,
                            label: (
                                <span>
                                    {customer.name} <span className="text-xs">({customer.cpf})</span>
                                </span>
                            ),
                            keywords: [customer.cpf, customer.name],
                        })}
                        searchEndpoint={'/api/customers'}
                    />
                </FormField>

                <FormField span={4} error={formHook.errors.name} label="Nome" htmlFor="name" required>
                    <ComboBox
                        
                        prefetchedOptions={[
                             { id: 1, name: 'Carro 1', license_plate: 'ABC-1234', color: { hex: '#ff0000' } },
                        ]}
                        buttonClassName='w-full'
                        value={formHook.data.vehicle_id ? `${formHook.data.vehicle_id}` : ''}
                        onChange={(value) => formHook.setData('vehicle_id', value)}
                        parseItem={(vehicle) => ({
                            value: `${vehicle.id}`,
                            label: (
                                <div className="flex items-center gap-2">
                                    {vehicle.name} <span className="text-xs">({vehicle.license_plate})</span>
                                    <div
                                        className="h-3 w-3 rounded"
                                        style={{ backgroundColor: vehicle.color.hex, border: '1px solid #aaaaaa44' }}
                                    ></div>
                                </div>
                            ),
                            keywords: [vehicle.name, vehicle.license_plate],
                        })}
                        searchEndpoint={'/api/vehicles'}
                        extraParams={{ include: 'color' }}
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
