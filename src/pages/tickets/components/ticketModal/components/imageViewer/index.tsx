import { useState } from "react";
import { ImageViewerContainer, LoadingText, Thumbnail } from "./styles";
import CenterModal from "../../../../../../components/centerModal";
import ImageViewerModal from "./imageViewerModal";

interface ImageViewerProps {
  imageUrl?: string;
}

const ImageViewer = ({ imageUrl }: ImageViewerProps) => {
  const [thumbnailUrl] = useState<string>(imageUrl as any);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <ImageViewerContainer>
      {thumbnailUrl ? (
        <>
          <Thumbnail src={thumbnailUrl} onClick={openModal} />

          <CenterModal open={modalIsOpen} onOpenChange={setModalIsOpen}>
            <ImageViewerModal imageUrl={imageUrl as any} onClose={closeModal} />
          </CenterModal>
        </>
      ) : (
        <LoadingText>Loading...</LoadingText>
      )}
    </ImageViewerContainer>
  );
};

export default ImageViewer;
