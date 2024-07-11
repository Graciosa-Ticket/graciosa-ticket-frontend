import * as yup from "yup";

export const createUserValidation = yup.object().shape({
  role: yup.string(),
  name: yup
    .string()
    .required("Nome é obrigatorio")
    .min(3, "Minimo 3 caracteres"),
  email: yup.string().email("email Invalido").required("Email é obrigatorio"),
  birth_date: yup
    .date()
    .typeError("data incorreta")
    .max(new Date(), `data invalida`)
    .required(),
  address: yup.string().required("Endereço é obrigatorio"),
  cep: yup.string().max(9, "CEP invalido").required("CEP é obrigatorio"),
  phone_number: yup
    .string()
    .max(13, "maximo 13 caracteres")
    .required("DD+telefone é obrigatorio"),
  profile_picture: yup.string().optional(),
  password: yup.string().min(8,"Senha deve conter minimo de 8 caracteres").required()
});
