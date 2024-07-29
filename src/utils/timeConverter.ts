function timeConverter(dateInput: Date | string | undefined): string {
  if (dateInput === undefined) {
    return "Data inválida";
  }

  const date = new Date(dateInput);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();

  const seconds = Math.floor(diffInMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 5) {
    return date.toLocaleDateString("pt-BR");
  } else if (seconds === 1) {
    return `1 Seg`;
  } else if (seconds < 60) {
    return `${seconds} Segs`;
  } else if (minutes === 1) {
    return `1 Min`;
  } else if (minutes < 60) {
    return `${minutes} Mins`;
  } else if (hours === 1) {
    return `1 Hr`;
  } else if (hours < 24) {
    return `${hours} Hrs`;
  } else if (days === 1) {
    return `1 Dia`;
  } else if (days < 7) {
    return `${days} Dias`;
  } else {
    return "Tempo desconhecido";
  }
}

export default timeConverter;
