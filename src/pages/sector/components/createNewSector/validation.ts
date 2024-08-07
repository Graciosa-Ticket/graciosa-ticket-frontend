import * as yup from "yup";

export const createSectorValidation = yup.object().shape({
  name: yup.string().required("Nome é obrigatorio"),
  responsible_code: yup
    .string()
    .required("O Código do responsável é obrigatorio"),
  description: yup.string().required("A Descrição é obrigatoria"),
});

export const updateSectorValidation = yup.object().shape({
  code: yup.string().required("Código é obrigatorio"),
});