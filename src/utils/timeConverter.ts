function timeConverter(date: Date): string {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    
    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30); 
    const years = Math.floor(days / 365); 

    if (seconds < 60) {
      return `${seconds} Seg`;
    } else if (minutes < 60) {
      return `${minutes} Min`;
    } else if (hours < 24) {
      return `${hours} Hs`;
    } else if (days < 7) {
      return `${days} Dia(s)`;
    } else if (weeks < 4) {
      return `${weeks} Seman`;
    } else if (months < 12) {
      return `${months} Mes(ses)`;
    } else {
      return `${years} Ano(s)`;
    }
  } 
  
  export default timeConverter;
  