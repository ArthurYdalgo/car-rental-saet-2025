import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// your existing inputs
import { ZipInput } from "@/components/zip-input";
import { DatePicker } from "@/components/date-picker";
import { CPFInput } from "@/components/cpf-input";

// the state picker below (place it wherever you keep shared inputs)
import { StatePicker } from "@/components/state-picker";

export default ({
    formHook,
    onSubmit = (e) => {},
    ...props
}) => {

}