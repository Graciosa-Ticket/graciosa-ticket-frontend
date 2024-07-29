import axios from "axios";

export const AddressByCep = async (cep: string) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    const { logradouro, bairro } = response.data;
    return { logradouro, bairro };
  } catch (error) {
    throw new Error(`Erro ao buscar o endereço`);
  }
};
