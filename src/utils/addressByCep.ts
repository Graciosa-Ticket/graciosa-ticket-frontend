import axios from "axios";

interface SimplifiedAddressResponse {
  logradouro: string;
  bairro: string;
  erro: boolean;
}

export const getSimplifiedAddressByCep = async (
  cep: string
): Promise<SimplifiedAddressResponse> => {
  try {
    const response = await axios.get<SimplifiedAddressResponse>(
      `https://viacep.com.br/ws/${cep}/json/`
    );

    if (response.data.erro) {
      throw new Error("CEP não encontrado");
    }

    return {
      logradouro: response.data.logradouro,
      bairro: response.data.bairro,
      erro: false,
    };
  } catch (error) {
    throw new Error(`Erro ao buscar o endereço`);
  }
};
