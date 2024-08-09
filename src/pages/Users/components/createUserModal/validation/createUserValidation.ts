import * as yup from "yup";
import calculateMinimunAge from "../../../../../utils/calculateAge";

interface FormValues {
  birth_date: Date | null;
}

export const createUserValidation = yup.object<FormValues>().shape({
  role: yup.string(),
  name: yup
    .string()
    .required("Nome é obrigatorio")
    .min(3, "Minimo 3 caracteres"),
  email: yup
    .string()
    .required("Email é obrigatório")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Email inválido"),
  birth_date: yup
    .date()
    .typeError("Data incorreta")
    .max(new Date(), "Data inválida")
    .required("Campo obrigatório")
    .test("min-age", "Você deve ter pelo menos 16 anos", (value) => {
      if (!value) return false;
      return calculateMinimunAge(new Date(value)) >= 16;
    }),
  address: yup.string().required("Endereço é obrigatorio"),
  cep: yup.string().max(9, "CEP invalido").required("CEP é obrigatorio"),
  phone_number: yup
    .string()
    .max(20, "maximo 14 caracteres")
    .min(14, "DD+telefone é obrigatorio")
    .required("DD+telefone é obrigatorio"),
  profile_picture: yup.string().optional(),
  password: yup
    .string()
    .min(8, "Senha minima 8 caracteres")
    .required("A senha é obrigatória"),
});

export const updateUserValidation = yup.object().shape({
  code: yup.string().required("Código é obrigatorio"),
});
