export default function formatCEP(cep: string): string {
  if (!cep) return "";
  let cleanCep = cep.replace(/\D/g, "");

  return cleanCep.replace(/(\d{5})(\d{3})/, "$1-$2");
}
