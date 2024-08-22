import { useMemo } from "react";
import { ChatFileContainer } from "./styles";
import { IoDocumentOutline } from "react-icons/io5";
import { FaRegFileExcel, FaRegFilePdf, FaRegFileImage } from "react-icons/fa";
import ButtonComponent from "../../../../../../components/buttons";
import { AiOutlineCloseCircle } from "react-icons/ai";

type formattedFileType = {
  file: File;
  type: "image" | "pdf" | "doc" | "excel";
};

interface chatFileViewerProps {
  files: File[];
  onRemoveFile: (file: File) => void;
}

type TFileTypes =
  | "pdf"
  | "jpg"
  | "jpeg"
  | "png"
  | "doc"
  | "csv"
  | "xlsx"
  | "xls"
  | "txt"
  | "docx";

const fileTypes = {
  pdf: "pdf",
  jpg: "image",
  jpeg: "image",
  png: "image",
  doc: "doc",
  docx: "doc",
  txt: "doc",
  csv: "excel",
  xlsx: "excel",
  xls: "excel",
};

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
        {formattedFiles.map((e, i) => (
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
        ))}
      </ul>
    </ChatFileContainer>
  );
};

export default ChatFileViewer;
