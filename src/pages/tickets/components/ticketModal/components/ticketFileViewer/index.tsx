import { useMemo } from "react";
import { TicketFileContainer } from "./styles";
import { IoDocumentOutline } from "react-icons/io5";
import { FaRegFileExcel, FaRegFilePdf } from "react-icons/fa";
import ImageViewer from "../imageViewer";
import ButtonComponent from "../../../../../../components/buttons";
import { amazonURL } from "../../../../../../components/Avatar";

type formattedFileType = {
  file: string;
  type: "image" | "pdf" | "doc" | "excel";
};

interface ticketFileViewerProps {
  files?: string[];
}

type TFileTypes = "pdf" | "jpg" | "png" | "doc" | "csv" | "xlsx" | "docx";

const fileTypes = {
  pdf: "pdf",
  jpg: "image",
  png: "image",
  doc: "doc",
  docx: "doc",
  csv: "excel",
  xlsx: "excel",
};

const fileIcons = {
  pdf: <FaRegFilePdf />,
  excel: <FaRegFileExcel />,
  doc: <IoDocumentOutline />,
};

const TicketFileViewer = ({ files }: ticketFileViewerProps) => {
  const formattedFiles: formattedFileType[] = useMemo(() => {
    if (!files?.length) return [];

    return files.map((file) => {
      // Extrai a extensão do arquivo e converte para minúsculas
      const fileExtension = file.split(".").pop()?.toLowerCase() || "";

      return {
        type: (fileTypes?.[fileExtension as TFileTypes] ||
          "doc") as formattedFileType["type"],
        file,
      };
    });
  }, [files]);

  const handleDownload = (file: string) => {
    const link = document.createElement("a");
    link.target = "_self";
    const baseUrl = amazonURL;
    const cleanFileName =
      file
        .split("/")
        .pop()
        ?.replace(/^ticketAttachments_\d+_/, "") || file;
    const fullUrl = baseUrl + file;
    link.href = fullUrl;
    link.download = cleanFileName;
    link.click();
  };

  const getCleanFileName = (file: string) => {
    const fileName = file.split("/").pop() || file;
    return fileName.replace(/^\d+_/, "");
  };

  return (
    <TicketFileContainer>
      <ul>
        {formattedFiles.map((e, i) => {
          const cleanFileName = getCleanFileName(e.file);

          if (e.type === "image") {
            return (
              <li key={i}>
                <ImageViewer imageUrl={e.file} />
                <span>{cleanFileName}</span>
              </li>
            );
          }

          if (e.type === "pdf") {
            return (
              <li key={i}>
                <ButtonComponent
                  buttonStyles="text"
                  onClick={() => handleDownload(e.file)}
                  title="Clique para baixar o PDF"
                >
                  <FaRegFilePdf />
                  <span>{cleanFileName}</span>
                </ButtonComponent>
              </li>
            );
          }

          // Renderiza o ícone e o nome do arquivo para outros tipos (doc, excel)
          return (
            <li key={i}>
              <ButtonComponent
                buttonStyles="text"
                onClick={() => handleDownload(e.file)}
                title="Clique para baixar"
              >
                {fileIcons[e.type]}
                <span>{cleanFileName}</span>
              </ButtonComponent>
            </li>
          );
        })}
      </ul>
    </TicketFileContainer>
  );
};

export default TicketFileViewer;
