import { amazonURL } from "../components/Avatar";

export type formattedFileType = {
  file: string;
  type: "image" | "pdf" | "doc" | "excel";
};

export type TFileTypes =
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

export const fileTypes = {
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

export const IdentifyFiles = (files?: string[]): formattedFileType[] => {
  if (!files?.length) return [];

  return files.map((file) => {
    const fileExtension = file.split(".").pop()?.toLowerCase() || "";

    return {
      type: (fileTypes?.[fileExtension as TFileTypes] ||
        "doc") as formattedFileType["type"],
      file,
    };
  });
};

export const getCleanFileName = (file: string) => {
  const fileName = file.split("/").pop() || file;
  return fileName.replace(/^\d+(_\d+)*_/, "");
};

export const handleDownloadFile = (file: string) => {
  const link = document.createElement("a");
  link.target = "_self";
  const baseUrl = amazonURL;
  const cleanFileName = getCleanFileName(file);
  const fullUrl = baseUrl + "ticket_attachments/" + file;
  link.href = fullUrl;
  link.download = cleanFileName;
  link.click();
};
