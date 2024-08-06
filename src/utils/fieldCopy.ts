import { toast } from "sonner";
//funcao para copiar texto enviado
const FieldCopy = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {
    toast.success("Copiado com sucesso!");
  });
};

export default FieldCopy;
