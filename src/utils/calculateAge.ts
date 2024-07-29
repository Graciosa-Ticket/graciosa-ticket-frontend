export function calculateAge(birthday: string | Date): number | undefined {
  if (!birthday) return undefined;

  const ageDiffMs = Date.now() - new Date(birthday).getTime();
  const ageDate = new Date(ageDiffMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

const calculateMinimunAge = (birthDate: Date): number => {
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    return age - 1;
  }
  return age;
};

export default calculateMinimunAge;
