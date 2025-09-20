// your existing inputs
import CPFInput from '@/components/cpf-input';
import DatePicker from '@/components/date-picker';
import ZipCodeInput from '@/components/zip-input';

// the state picker below (place it wherever you keep shared inputs)
import StatePicker from '@/components/state-picker';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default ({ formHook, onSubmit = (e) => {}, ...props }) => {
    const id = (field) => `cliente-form-${field}`;
    const dv = formHook?.defaultValues || {};
    return (
       <div className="grid gap-6">
      {/* Personal info */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor={id("name")}>Nome</Label>
          <Input
            id={id("name")}
            name="name"
            defaultValue={dv.name}
            placeholder="João"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor={id("email")}>E-mail</Label>
          <Input
            id={id("email")}
            name="email"
            type="email"
            defaultValue={dv.email}
            placeholder="joao@utfpr.edu.br"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor={id("cpf")}>CPF</Label>
          <CPFInput
            id={id("cpf")}
            name="cpf"
            placeholder="000.000.000-00"
            defaultValue={dv.cpf}
          />
        </div>

        <div className="grid gap-2">
          
          <DatePicker
            label={"Data de nascimento"}
            id={id("birthday")}
            name="birthday"
            defaultValue={dv.birthday}
            placeholder="1997-01-01"
          />
        </div>
      </div>

      {/* Driver's license */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor={id("license_number")}>Nº da CNH</Label>
          <Input
            id={id("license_number")}
            name="license_number"
            defaultValue={dv.license_number}
            placeholder="12345"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor={id("license_issuing_state")}>UF emissora da CNH</Label>
          <StatePicker
            id={id("license_issuing_state")}
            name="license_issuing_state"
            defaultValue={dv.license_issuing_state}
            placeholder="PR"
          />
        </div>
      </div>

      {/* Address */}
      <div className="grid gap-4">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="grid gap-2">
            <Label htmlFor={id("address.zip_code")}>CEP</Label>
            <ZipCodeInput
              id={id("address.zip_code")}
              name="address.zip_code"
              defaultValue={dv.address?.zip_code}
              placeholder="85902-490"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor={id("address.state")}>UF</Label>
            <StatePicker
              id={id("address.state")}
              name="address.state"
              defaultValue={dv.address?.state}
              placeholder="PR"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor={id("address.city")}>Cidade</Label>
            <Input
              id={id("address.city")}
              name="address.city"
              defaultValue={dv.address?.city}
              placeholder="Toledo"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="grid gap-2">
            <Label htmlFor={id("address.district")}>Bairro</Label>
            <Input
              id={id("address.district")}
              name="address.district"
              defaultValue={dv.address?.district}
              placeholder="Vila Becker"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor={id("address.street")}>Rua</Label>
            <Input
              id={id("address.street")}
              name="address.street"
              defaultValue={dv.address?.street}
              placeholder="R. Cristo Rei"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor={id("address.number")}>Número</Label>
            <Input
              id={id("address.number")}
              name="address.number"
              defaultValue={dv.address?.number}
              placeholder="19"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor={id("address.complement")}>Complemento</Label>
          <Input
            id={id("address.complement")}
            name="address.complement"
            defaultValue={dv.address?.complement}
            placeholder="Bloco E. Sala 306"
          />
        </div>
      </div>
    </div>
    );
};
