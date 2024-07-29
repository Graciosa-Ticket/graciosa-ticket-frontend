import { useRef, useState, ChangeEvent, ReactNode } from "react";
import ImageCropperEdit from "./cropper";
import { ImageSelectButton, ImagesPreviewContainer } from "./styles";
import CenterModal from "../centerModal";
import { FaPlus } from "react-icons/fa";
import ButtonComponent from "../buttons";

export type editImagesArray = {
  oldImage: string;
  newImage: string;
  file: File | null;
};

interface imageCropperProps {
  onChange: (value: editImagesArray[]) => void;
  accept?: string;
  defaultValue?: editImagesArray[];
  children: ReactNode;
}

const ImageCropper = ({
  accept = "image/png, image/gif, image/jpeg",
  onChange,
  defaultValue = [],
  children,
}: imageCropperProps) => {
  const [image, setImage] = useState<editImagesArray[]>(defaultValue);
  const [mainImage, setMainImage] = useState<editImagesArray>(() => {
    if (defaultValue.length) {
      return defaultValue[0];
    }
    return {
      newImage: "",
      oldImage: "",
      file: null,
    };
  });
  const [open, setOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const getImageFile = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target?.files?.length) {
      const files = target.files;
      const filesArray = Array.from(files).map((e) => {
        const url = URL.createObjectURL(e);

        return {
          newImage: url,
          oldImage: url,
          file: e,
        };
      });

      setImage((old) => {
        if (old?.length) {
          const imgrArr = [...old, ...filesArray].map(
            ({ oldImage, newImage, file }) => ({
              oldImage,
              newImage,
              file,
            })
          );

          onChange(imgrArr);
          return imgrArr;
        }
        const imgrArr = filesArray.map(({ oldImage, newImage, file }) => ({
          oldImage,
          newImage,
          file,
        }));
        onChange(imgrArr);
        return imgrArr;
      });

      setMainImage(filesArray[0]);
    }
  };

  const onRemoveImg = () => {
    setImage((old) => {
      const filteredImages = old.filter(
        (f) => f.oldImage !== mainImage.oldImage
      );
      setMainImage(filteredImages[0]);
      onChange(filteredImages);

      return filteredImages;
    });
  };

  const onEditImage = (newImg: string) => {
    setImage((old) => {
      const imageIndex = old.findIndex(
        (e) => e.oldImage === mainImage?.oldImage
      );

      old[imageIndex] = {
        oldImage: old[imageIndex].oldImage,
        newImage: newImg,
        file: old[imageIndex].file,
      };
      return old;
    });
    onChange(image);

    setMainImage((main) => ({ ...main, newImage: newImg }));
  };

  return (
    <>
      <CenterModal open={open} onOpenChange={() => setOpen(!open)}>
        <ImageCropperEdit
          imageUrl={mainImage?.oldImage}
          onClose={() => setOpen(false)}
          setNewImage={onEditImage}
        />
      </CenterModal>
      {image.length > 0 ? (
        <ImagesPreviewContainer>
          <div className="main-image">
            <img src={mainImage.newImage} alt="edit-image-preview" />

            <div className="actions-buttons">
              <button type="button" onClick={onRemoveImg}>
                Remover
              </button>
              <button type="button" onClick={() => setOpen(true)}>
                Editar
              </button>
            </div>
          </div>

          <ul className="image-list">
            <button
              type="button"
              className="add-new-image"
              onClick={() => inputRef.current?.click()}
            >
              <FaPlus />
            </button>
            {image.map((e, i) => (
              <ImageItem
                image={e}
                index={i}
                key={i}
                selected={mainImage.oldImage === e.oldImage}
                onSelect={setMainImage}
              />
            ))}
          </ul>
        </ImagesPreviewContainer>
      ) : (
        <ButtonComponent
          buttonStyles="text"
          className="crop-image-button-container"
          onClick={() => inputRef.current?.click()}
        >
          {children}
        </ButtonComponent>
      )}
      <input
        type="file"
        ref={inputRef}
        multiple
        accept={accept}
        style={{ display: "none" }}
        onChange={getImageFile}
      />
    </>
  );
};
interface imageItemProp {
  onSelect: (value: editImagesArray) => void;
  image: editImagesArray;
  index: number;
  selected: boolean;
}

const ImageItem = ({ onSelect, image, selected }: imageItemProp) => {
  return (
    <ImageSelectButton
      type="button"
      onClick={() => onSelect(image)}
      $selected={selected}
    >
      <img src={image.newImage} />
    </ImageSelectButton>
  );
};

export default ImageCropper;
