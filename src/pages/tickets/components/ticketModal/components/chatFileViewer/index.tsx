import { useMemo } from "react";
import { ChatFileContainer } from "./styles";
import { IoDocumentOutline } from "react-icons/io5";
import { FaRegFileExcel, FaRegFilePdf, FaRegFileImage } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { TFileTypes, fileTypes } from "../../../../../../utils/fileIdentify";

type formattedFileType = {
  file: File;
  type: "image" | "pdf" | "doc" | "excel";
};

interface chatFileViewerProps {
  files: File[];
  onRemoveFile: (file: File) => void;
}

const fileIcons = {
  pdf: <FaRegFilePdf />,
  excel: <FaRegFileExcel />,
  doc: <IoDocumentOutline />,
  image: <FaRegFileImage />,
};

const ChatFileViewer = ({ files, onRemoveFile }: chatFileViewerProps) => {
  const formattedFiles: formattedFileType[] = useMemo(() => {
    return files.map((file) => {
      const fileExtension = file.name.split(".").pop()?.toLowerCase() || "";

      return {
        type: (fileTypes[fileExtension as TFileTypes] ||
          "doc") as formattedFileType["type"],
        file,
      };
    });
  }, [files]);

  return (
    <ChatFileContainer>
      <ul>
        {formattedFiles.map((e, i) => {
          if (e.type === "image") {
            const imageUrl = URL.createObjectURL(e.file);

            return (
              <li key={i} className="image-container">
                <img src={imageUrl} />
                <button
                  onClick={() => onRemoveFile(e.file)}
                  title="Remover arquivo"
                >
                  <AiOutlineCloseCircle />
                </button>
              </li>
            );
          }

          return (
            <li key={i}>
              {fileIcons[e.type]}
              <span className="file-name">
                {e.file.name.length > 10
                  ? `${e.file.name.slice(0, 10)}...`
                  : e.file.name}
              </span>
              <button
                onClick={() => onRemoveFile(e.file)}
                title="Remover arquivo"
              >
                <AiOutlineCloseCircle />
              </button>
            </li>
          );
        })}
      </ul>
    </ChatFileContainer>
  );
};

export default ChatFileViewer;
