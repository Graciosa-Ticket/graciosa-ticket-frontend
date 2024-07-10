export function calculateAge(birthday: string | Date): number | undefined {
  if (!birthday) return undefined;

  const ageDiffMs = Date.now() - new Date(birthday).getTime();
  const ageDate = new Date(ageDiffMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
