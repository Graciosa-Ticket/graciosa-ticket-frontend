import { CSSProperties, useState } from "react";
import { ImageViewerContainer, Thumbnail } from "./styles";
import CenterModal from "../../../../../../components/centerModal";
import ImageViewerModal from "./imageViewerModal";
import { amazonURL } from "../../../../../../components/Avatar";

interface ImageViewerProps {
  imageUrl?: string;
  style?: CSSProperties;
}

const ImageViewer = ({ imageUrl, style }: ImageViewerProps) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

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
          imageUrl={(amazonURL + imageUrl) as any}
          onClose={closeModal}
        />
      </CenterModal>
      <ImageViewerContainer>
        <Thumbnail
          src={amazonURL + imageUrl}
          onClick={openModal}
          style={style}
          title="Clique para expandir"
        />
      </ImageViewerContainer>
    </>
  );
};

export default ImageViewer;
