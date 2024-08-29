import * as yup from "yup";

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

  // phone_number: yup
  //   .string()
  //   .max(20, "maximo 14 caracteres")
  //   .min(10, "DD+telefone é obrigatorio")
  //   .required("DD+telefone é obrigatorio"),
  profile_picture: yup.string().optional(),
  password: yup
    .string()
    .min(8, "Senha minima 8 caracteres")
    .required("A senha é obrigatória"),
});

export const updateUserValidation = yup.object().shape({
  code: yup.string().required("Código é obrigatorio"),
});
