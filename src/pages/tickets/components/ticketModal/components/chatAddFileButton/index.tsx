import { ChangeEvent } from "react";
import fileLimit from "../../../../../../utils/fileSizeLimit";
import { ChatAddFilesButtonContainer } from "./styles";
import { FaPaperclip } from "react-icons/fa6";

interface ChatAddFilesButtonProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const ChatAddFilesButton = ({ files, setFiles }: ChatAddFilesButtonProps) => {
  const handleChangeInputValue = (current: ChangeEvent<HTMLInputElement>) => {
    const fileList = current.target.files as FileList;

    if (fileList?.length) {
      const filesArray = Array.from(fileList);

      // Filtra arquivos duplicados e grandes
      const newFiles = filesArray.filter((file) => {
        const isDuplicate = files.some(
          (existingFile) => existingFile.name === file.name
        );
        const { canUpload } = fileLimit(
          file,
          2,
          `O arquivo: ${file.name}, é muito grande`
        );
        return !isDuplicate && canUpload;
      });

      // Adiciona novos arquivos à lista existente
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  return (
    <ChatAddFilesButtonContainer>
      <label
        className="label-container"
        htmlFor="fileInput"
        title="Adicionar anexo"
      >
        <FaPaperclip />
      </label>

      <input
        id="fileInput"
        type="file"
        multiple
        onChange={handleChangeInputValue}
      />
    </ChatAddFilesButtonContainer>
  );
};

export default ChatAddFilesButton;
