// app/example-form.jsx

import { Button } from '@/components/ui/button';

import CurrencyInput from '@/components/currency-input';
import DatePicker from '@/components/date-picker';
import { FormActions, FormField, FormRow, FormSection } from '@/components/form-layout';
import If from '@/components/if';
import Money from '@/components/money';
import PaymentMethodPicker from '@/components/payment-method-picker';
import { ComboBox } from '@/components/ui/combo-box';
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';

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
            <FormSection title="Cliente" titleWidth="md:w-48">
                <FormRow cols={12}>
                    <FormField span={4} error={formHook.errors.customer_id} htmlFor="customer_id" required>
                        <ComboBox
                            id="customer_id"
                            name="customer_id"
                            popoverContentClassName="w-[350px]"
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
                </FormRow>
            </FormSection>

            <FormSection title="Veículo" titleWidth="md:w-48">
                <FormRow cols={12}>
                    <FormField
                        span={4}
                        error={formHook.errors.vehicle_id}
                        description={
                            <span>
                                Preço por dia: <Money amount={vehicle?.price_per_day} />
                            </span>
                        }
                        htmlFor="vehicle_id"
                        required
                    >
                        <ComboBox
                            id="vehicle_id"
                            name="vehicle_id"
                            disabled={props.disableVehiclesComboBox ?? false}
                            prefetchedOptions={props.prefetchedVehicles ?? null}
                            buttonClassName="w-full"
                            value={formHook.data.vehicle_id ? `${formHook.data.vehicle_id}` : ''}
                            popoverContentClassName="w-[350px]"
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
                </FormRow>
            </FormSection>

            <FormSection title="Datas" titleWidth="md:w-48">
                <FormRow cols={12}>
                    <FormField span={2} error={formHook.errors.name} label="Início" htmlFor="vehicle_id" required>
                        <DatePicker label="" />
                    </FormField>
                    <FormField span={2} error={formHook.errors.name} label="Termino" htmlFor="vehicle_id" required>
                        <DatePicker label="" />
                    </FormField>
                </FormRow>
            </FormSection>

            <FormSection title="Pagamento" titleWidth="md:w-48">
                <FormRow cols={12}>
                    <FormField span={3} error={formHook.errors.name} label="Método de Pagamento" htmlFor="vehicle_id" required>
                        {(formHook.data.payment_methods ?? [{ id: '', amount: 0 }]).map((method, index) => (
                            <div key={`payment-section-method-${index}`} className="flex items-center gap-2">
                                <PaymentMethodPicker
                                    onChange={(value) => {
                                        let updatedMethods = [...(formHook.data.payment_methods ?? [])];
                                        updatedMethods[index] = { id: value, amount: method.amount };

                                        console.log(updatedMethods);
                                        formHook.setData('payment_methods', updatedMethods);
                                    }}
                                    value={method.id}
                                />
                            </div>
                        ))}
                    </FormField>
                    <FormField span={3} error={formHook.errors.name} label="Valor" htmlFor="vehicle_id" required>
                        {(formHook.data.payment_methods ?? [{ id: '', amount: 0 }]).map((method, index) => (
                            <div key={`payment-section-amount-${index}`} className="flex items-center gap-2">
                                <CurrencyInput />
                                {/* <If
                                    condition={
                                        (formHook.data.payment_methods ?? []).length > 1 && index == (formHook.data.payment_methods ?? []).length - 1
                                    }
                                >
                                    <Button type="button" variant="destructive"></Button>
                                </If> */}
                                <If
                                    condition={
                                        (formHook.data.payment_methods ?? []).length > 1 && index < (formHook.data.payment_methods ?? []).length - 1
                                    }
                                >
                                    <Button type="button" variant="destructive" onClick={() => {
                                        let updatedMethods = [...(formHook.data.payment_methods ?? [])];
                                        
                                        // remove the item at index
                                        delete updatedMethods[index];

                                        // reset indexes
                                        updatedMethods = updatedMethods.filter(item => item);

                                        formHook.setData('payment_methods', updatedMethods);
                                    }}>
                                        <MinusIcon />
                                    </Button>
                                </If>
                                <If condition={((formHook.data.payment_methods ?? []).length <= 1 && index == 0) || index == (formHook.data.payment_methods ?? []).length - 1}>
                                    <Button
                                        type="button"
                                        variant="green"
                                        onClick={() => {
                                            let updatedMethods = [...(formHook.data.payment_methods ?? [])];

                                            if (updatedMethods.length == 0) {
                                                updatedMethods = [{ id: '', amount: 0 }];
                                            }

                                            updatedMethods.push({ id: '', amount: 0 });
                                            formHook.setData('payment_methods', updatedMethods);
                                        }}
                                    >
                                        <PlusIcon />
                                    </Button>
                                </If>
                            </div>
                        ))}

                        {/* <PaymentMethodPicker /> */}
                    </FormField>
                </FormRow>
            </FormSection>

            <FormActions>
                <Button type="submit">Salvar</Button>
            </FormActions>
        </form>
    );
}
