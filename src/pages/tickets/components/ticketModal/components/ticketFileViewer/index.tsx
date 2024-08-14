import { useMemo } from "react";
import { TicketFileContainer } from "./styles";
import { IoDocumentOutline } from "react-icons/io5";
import { FaRegFileExcel, FaRegFilePdf } from "react-icons/fa";
import ImageViewer from "../imageViewer";
// import ButtonComponent from "../../../../../../components/buttons";

type formattedFileType = {
  file: string;
  type: "image" | "pdf" | "doc" | "excel";
};

interface ticketFileViewerProps {
  files?: string[];
}

type TFileTypes = "pdf" | "jpg" | "png" | "doc" | "csv" | "xlsx";

const fileTypes = {
  pdf: "pdf",
  jpg: "image",
  png: "image",
  doc: "doc",
  csv: "excel",
  xlsx: "excel",
};

const fileIcons = {
  pdf: <FaRegFilePdf />,
  excel: <FaRegFileExcel />,
  doc: <IoDocumentOutline />,
};

// const blobTypes = {
//   excel: "application/vnd.ms-excel",
//   pdf: "application/pdf",
//   doc: "application/doc",
// };

const TicketFileViewer = ({ files }: ticketFileViewerProps) => {
  const formattedFiles: formattedFileType[] = useMemo(() => {
    if (!files?.length) return [];

    return files.map((file) => {
      const [_, type] = file.split(".");

      return {
        type: (fileTypes?.[type as TFileTypes] ||
          "image") as formattedFileType["type"],
        file,
      };
    });
  }, [files]);

  //   const handleDownload = (file: string, type: formattedFileType["type"]) => {
  //     const link = document.createElement("a");
  //     link.target = "self";
  //     const blob = new Blob([file], {
  //       type: blobTypes[type],
  //     });
  //     link.href = URL.createObjectURL(blob);
  //     link.download = file;
  //     link.click();
  //   };

  return (
    <TicketFileContainer>
      <ul>
        {formattedFiles.map((e, i) => {
          if (e.type === "image") {
            return (
              <li key={i}>
                <ImageViewer imageUrl={e.file} />

                <span>{e.file}</span>
              </li>
            );
          }

          return (
            <li key={i}>
              {/* <ButtonComponent
                buttonStyles="text"
                onClick={() => handleDownload(e.file, e.type)}
              >
              </ButtonComponent> */}
              {fileIcons[e.type]}

              <span>{e.file}</span>
            </li>
          );
        })}
      </ul>
    </TicketFileContainer>
  );
};

export default TicketFileViewer;
