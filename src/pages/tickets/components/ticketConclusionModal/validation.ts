import * as yup from "yup";

export const concludeTicketValidation = yup.object().shape({
  description: yup
    .string()
    .required("A Descrição é obrigatoria")
    .max(2000, "maximo 2000 caracteres")
    .min(20, "minimo 20 caracteres"),
});
