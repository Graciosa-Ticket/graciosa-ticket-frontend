import { AiOutlineClose } from "react-icons/ai";
import ButtonComponent from "../../../../../../../components/buttons";
import { ImageViewerModalComponent } from "./styles";
import ImageMagnifier from "../../../../../../../components/ImageMagnifier";

interface ImageViewerModalProps {
  imageUrl: string;
  onClose: () => void;
}

export default function ImageViewerModal({
  imageUrl,
  onClose,
}: ImageViewerModalProps) {
  return (
    <ImageViewerModalComponent>
      <section className="close-button">
        <ButtonComponent
          buttonStyles="text"
          title="Fechar"
          buttonStylesType="outline"
          onClick={onClose}
        >
          <AiOutlineClose fontSize="1em" />
        </ButtonComponent>
      </section>

      <ImageMagnifier src={imageUrl} alt="Imagem" />
    </ImageViewerModalComponent>
  );
}
