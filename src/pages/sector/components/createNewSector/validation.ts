import * as yup from "yup";

export const createSectorValidation = yup.object().shape({
  name: yup.string().required("Nome é obrigatorio"),
  responsible_code: yup.string().required("Responsável é obrigatorio"),
  description: yup.string().required("A Descrição é obrigatoria"),
  phobe: yup.string().required("Ramal é obrigatorio"),
});

export const updateSectorValidation = yup.object().shape({
  code: yup.string().required("Código é obrigatorio"),
});
