import * as yup from "yup";

export const ChangePasswordValidation = yup.object().shape({
  password: yup
    .string()
    .min(8, "Senha mínima de 8 caracteres")
    .required("A senha é obrigatória"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas devem coincidir")
    .required("A confirmação de senha é obrigatória"),
});
