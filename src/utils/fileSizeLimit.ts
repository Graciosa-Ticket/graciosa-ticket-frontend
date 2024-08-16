import { toast } from "sonner";

const fileLimit = (file: File, limit = 1, message = "Arquivo Muito grande") => {
  let canUpload = true;
  const fileSize = file.size;
  const fileMb = Math.round(fileSize / 1024 ** limit);

  if (fileMb >= limit * 1000) {
    toast.error(message);
    canUpload = false;
    return { canUpload };
  }
  return { canUpload };
};

export default fileLimit;
