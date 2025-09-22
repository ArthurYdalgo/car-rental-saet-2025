// app/example-form.jsx
import { Input } from '@/components/ui/input';

import { Button } from '@/components/ui/button';

import CpfInput from '@/components/cpf-input';
import DatePicker from '@/components/date-picker';
import { FormActions, FormField, FormRow, FormSection } from '@/components/form-layout';
import StatePicker from '@/components/state-picker';
import ZipInput from '@/components/zip-input';

export default function Customer() {
    return (
        <form className="space-y-8 p-6">
            {/* Section 1: Basic info (title on the RIGHT per your spec) */}
            <FormSection title="Informações Pessoais" titleWidth="md:w-48">
                <FormRow cols={12}>
                    <FormField span={6} label="Nome" htmlFor="name" required>
                        <Input id="name" name="name" placeholder="João" required />
                    </FormField>
                    <FormField span={6} label="CPF" htmlFor="last" required>
                        <CpfInput id="cpf" name="cpf" required/>
                    </FormField>

                    <FormField span={8} label="Email" htmlFor="email" required>
                        <Input id="email" type="email" placeholder="joao@gmail.com" />
                    </FormField>
                    <FormField span={4} label="Data de Nascimento" htmlFor="birthday" required>
                        <DatePicker innerDivClassName="w-full" id="birthday" name="birthday" label={null} required/>
                    </FormField>
                </FormRow>
            </FormSection>

            <FormSection title="Documentação" titleWidth="md:w-48">
                <FormRow cols={12}>
                    <FormField span={8} label="CNH" htmlFor="license_number" required>
                        <Input id="license_number" name="license_number" placeholder="Número da CNH"  required/>
                    </FormField>
                    <FormField span={4} label="UF emissora da CNH" htmlFor="license_issuing_state" required>
                        <StatePicker id="license_issuing_state" name="license_issuing_state" required/>
                    </FormField>
                </FormRow>
            </FormSection>

            <FormSection title="Endereço" titleWidth="md:w-48">
                <FormRow cols={12}>
                    <FormField span={12} label="CEP" htmlFor="address.street" required>
                        <Input id="address.street" name="address.street" placeholder="Av. Brasil" required/>
                    </FormField>

                    <FormField span={4} label="Número" htmlFor="address.number" required>
                        <Input id="address.number" name="address.number" placeholder="Av. Brasil" required/>
                    </FormField>
                    <FormField span={4} label="Complemento" htmlFor="address.complement" required>
                        <Input id="address.complement" name="address.complement" placeholder="Av. Brasil" required/>
                    </FormField>
                    <FormField span={4} label="Bairro" htmlFor="address.bairro" required>
                        <Input id="address.bairro" name="address.bairro" placeholder="Av. Brasil" required/>
                    </FormField>
                    
                    <FormField span={4} label="CEP" htmlFor="address.zip_code" required>
                        <ZipInput id="address.zip_code" name="address.zip_code" placeholder="85902-490" required/>
                    </FormField>
                    <FormField span={4} label="Cidade" htmlFor="address.city" required>
                        <Input id="address.city" name="address.city" placeholder="São Paulo" required/>
                    </FormField>
                    <FormField span={4} label="UF" htmlFor="address.state" required>
                        <StatePicker id="address.state" name="address.state" required/>
                    </FormField>
                </FormRow>
            </FormSection>

            {/* Actions */}
            <FormActions>
                <Button type="submit">Salvar</Button>
            </FormActions>
        </form>
    );
}
