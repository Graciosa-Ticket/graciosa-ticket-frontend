import { toast } from "sonner";

const fileLimit = (file: File, limit = 2, message = "Arquivo muito grande") => {
  let canUpload = true;
  const fileSize = file.size; // tamanho do arquivo em bytes
  const fileMb = fileSize / (1024 * 1024); // conversão de bytes para MB

  if (fileMb >= limit) {
    toast.error(message);
    canUpload = false;
    return { canUpload };
  }
  return { canUpload };
};

export default fileLimit;
