function formatPhoneNumber(value: string): string {
  const cleaned = value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos

  if (cleaned.length <= 2) {
    return cleaned;
  } else if (cleaned.length <= 5) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
  } else if (cleaned.length <= 7) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}`;
  } else {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(
      7,
      11
    )}`;
  }
}

export default formatPhoneNumber;
