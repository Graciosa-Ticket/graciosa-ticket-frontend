import * as yup from "yup";

export const concludeTicketValidation = yup.object().shape({
  description: yup
    .string()
    .required("A Descrição é obrigatoria")
    .max(800, "maximo 800 caracteres")
    .min(20, "minimo 20 caracteres"),
});
