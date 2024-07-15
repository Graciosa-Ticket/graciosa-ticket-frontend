import * as yup from "yup";

export const createTicketValidation = yup.object().shape({
  title: yup.string().required("O Título é obrigatorio"),
  description: yup.string().required("A Descrição é obrigatoria"),
  sector_code: yup.string().required("O Código do setor é obrigatorio"),
});

export const updateTicketValidation = yup.object().shape({
  code: yup.string().required("Código é obrigatorio"),
});
