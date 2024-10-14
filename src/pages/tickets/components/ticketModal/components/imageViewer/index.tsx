import { CSSProperties, useState } from "react";
import { ImageViewerContainer, Thumbnail } from "./styles";
import CenterModal from "../../../../../../components/centerModal";
import ImageViewerModal from "./imageViewerModal";
import { amazonURL } from "../../../../../../components/Avatar";

interface ImageViewerProps {
  imageUrl?: string;
  style?: CSSProperties;
  fronComments?: boolean;
}

const ImageViewer = ({ imageUrl, style, fronComments }: ImageViewerProps) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const pasteUrl = fronComments
    ? "comment_attachments/"
    : "ticket_attachments/";

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <CenterModal open={modalIsOpen} onOpenChange={setModalIsOpen}>
        <ImageViewerModal
          imageUrl={(amazonURL + pasteUrl + imageUrl) as any}
          onClose={closeModal}
        />
      </CenterModal>
      <ImageViewerContainer>
        <Thumbnail
          src={amazonURL + pasteUrl + imageUrl}
          onClick={openModal}
          style={style}
          title="Clique para expandir"
        />
      </ImageViewerContainer>
    </>
  );
};

export default ImageViewer;
