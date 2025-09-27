// app/example-form.jsx
import { Input } from '@/components/ui/input';

import { Button } from '@/components/ui/button';

import { FormActions, FormField, FormRow } from '@/components/form-layout';
import { ComboBox } from '@/components/ui/combo-box';
import axios from 'axios';
import { toast } from 'sonner';
import { useState } from 'react';
import Money from '@/components/money';

export default function RentalForm({ formHook, onSubmit = (e) => {}, ...props }) {
    const [vehicle, setVehicle] = useState(props.prefetchedVehicle);

    const updateVehicle = (vehicleId) => {

        if (!vehicleId) {
            setVehicle(null);
            return;
        }

        axios
            .get(`/api/vehicles/${vehicleId}`)
            .then((response) => {
                setVehicle(response.data.data);
            })
            .catch((error) => {
                toast.error('Erro ao obter dados do veículo.');
            });
    };

    return (
        <form onSubmit={onSubmit} className="space-y-8 p-6">
            <FormRow cols={12}>
                <FormField span={4} error={formHook.errors.name} label="Cliente" htmlFor="customer_id" required>
                    <ComboBox
                        id="customer_id"
                        name="customer_id"
                        popoverContentClassName='w-[350px]'
                        disabled={props.disableCustomersComboBox ?? false}
                        prefetchedOptions={props.prefetchedCustomers ?? null}
                        buttonClassName="w-full"
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

                <FormField span={4} error={formHook.errors.name} description={<span>Preço por dia: <Money amount={vehicle?.price_per_day} /></span>} label="Veículo" htmlFor="vehicle_id" required>
                    <ComboBox
                        id="vehicle_id"
                        name="vehicle_id"
                        disabled={props.disableVehiclesComboBox ?? false}
                        prefetchedOptions={props.prefetchedVehicles ?? null}
                        buttonClassName="w-full"
                        value={formHook.data.vehicle_id ? `${formHook.data.vehicle_id}` : ''}
                        popoverContentClassName='w-[350px]'
                        onChange={(value) => {
                            updateVehicle(value);
                            formHook.setData('vehicle_id', value);
                        }}
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
