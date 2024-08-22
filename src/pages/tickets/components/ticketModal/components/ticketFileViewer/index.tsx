import { useMemo } from "react";
import { TicketFileContainer } from "./styles";
import { IoDocumentOutline } from "react-icons/io5";
import { FaRegFileExcel, FaRegFilePdf } from "react-icons/fa";
import ImageViewer from "../imageViewer";
import ButtonComponent from "../../../../../../components/buttons";
import {
  IdentifyFiles,
  formattedFileType,
  getCleanFileName,
  handleDownloadFile,
} from "../../../../../../utils/fileIdentify";

interface ticketFileViewerProps {
  files?: string[];
}

export const fileIcons = {
  pdf: <FaRegFilePdf />,
  excel: <FaRegFileExcel />,
  doc: <IoDocumentOutline />,
};

const TicketFileViewer = ({ files }: ticketFileViewerProps) => {
  const formattedFiles: formattedFileType[] = useMemo(() => {
    return IdentifyFiles(files);
  }, [files]);

  return (
    <TicketFileContainer>
      <ul>
        {formattedFiles.map((e, i) => {
          const cleanFileName = getCleanFileName(e.file);
          if (e.type === "image") {
            return (
              <li key={i}>
                <ImageViewer imageUrl={e.file} />
                <ButtonComponent
                  buttonStyles="text"
                  onClick={() => handleDownloadFile(e.file)}
                  title="Clique para baixar a imagem"
                >
                  <span>{cleanFileName}</span>
                </ButtonComponent>
              </li>
            );
          }

          if (e.type === "pdf") {
            return (
              <li key={i}>
                <ButtonComponent
                  buttonStyles="text"
                  onClick={() => handleDownloadFile(e.file)}
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
                onClick={() => handleDownloadFile(e.file)}
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
