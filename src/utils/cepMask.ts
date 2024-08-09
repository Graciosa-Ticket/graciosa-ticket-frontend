export default function formatCep(value: string): string {
  const cleaned = value.replace(/\D/g, "");
  if (cleaned.length <= 5) {
    return cleaned;
  } else {
    return `${cleaned.slice(0, 5)}-${cleaned.slice(5, 8)}`;
  }
}
