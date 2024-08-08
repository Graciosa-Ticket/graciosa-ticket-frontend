import { useState } from "react";
import { ImageViewerContainer, LoadingText, Thumbnail } from "./styles";
import CenterModal from "../../../../../../components/centerModal";
import ImageViewerModal from "./imageViewerModal";

interface ImageViewerProps {
  imageUrl?: string;
}

const ImageViewer = ({
  imageUrl = "https://cdn.wallpaper.tn/large/2K-Resolution-Wallpaper-87962.jpg",
}: ImageViewerProps) => {
  const [thumbnailUrl] = useState<string>(imageUrl);
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
            <ImageViewerModal imageUrl={imageUrl} onClose={closeModal} />
          </CenterModal>
        </>
      ) : (
        <LoadingText>Loading...</LoadingText>
      )}
    </ImageViewerContainer>
  );
};

export default ImageViewer;
