function formatPhoneNumber(value: string): string {
  const cleaned = value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos

  if (cleaned.length <= 2) {
    return `(${cleaned}`; // Retorna apenas o código de área se tiver menos ou igual a 2 dígitos
  } else if (cleaned.length <= 6) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`; // Formata até os primeiros 6 dígitos
  } else if (cleaned.length <= 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(
      6,
      10
    )}`; // Formata com 4+4 dígitos
  } else {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(
      6,
      10
    )}`; // Limita a 10 dígitos totais
  }
}

export default formatPhoneNumber;
