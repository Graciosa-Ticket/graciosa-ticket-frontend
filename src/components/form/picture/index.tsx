import { ChangeEvent, useEffect, useRef, useState } from "react";
import ImageCropperEdit from "../../imageCropper/cropper";
import { InputProps } from "../input";
import { PictureContainer, UploadPictureContainer } from "./styles";
import CenterModal from "../../centerModal";
import { amazonURL, blankAvatar } from "../../Avatar";
import { FaPlus } from "react-icons/fa";

interface pictureInputProps extends InputProps {
  onChangeImage(value: string, file?: File): void;
  defaultUrl?: string;
}

const PictureInput = ({
  error,
  register,
  onChangeImage,
  defaultUrl,
  ...props
}: pictureInputProps) => {
  const [url, setUrl] = useState<string | undefined>(defaultUrl);
  const [, setFile] = useState<File | undefined>();
  const [editImage, setEditImage] = useState<string | undefined>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (defaultUrl) {
      setUrl(amazonURL + defaultUrl);
    }
  }, [defaultUrl]);

  const onGetImage = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.files?.length) {
      setFile(target.files[0]);
      const newUrl = URL.createObjectURL(target.files[0]);
      setEditImage(newUrl);
      setOpen(true);
    }
  };

  const onEditImage = async (value: string) => {
    setUrl(value);
    const editedFile = await fetch(value).then(async (e) => {
      const blob = await e.blob();

      return new File(
        [blob],
        `${Math.ceil(
          Math.random() * (2147000000 - 1) + 1
        ).toString()}-profile_picture.jpg`,
        {
          type: "image/jpeg",
        }
      );
    });

    onChangeImage(value, editedFile);
  };

  return (
    <>
      <CenterModal open={open} onOpenChange={() => setOpen(!open)}>
        <ImageCropperEdit
          imageUrl={editImage || ""}
          onClose={() => setOpen(false)}
          cropShape="round"
          setNewImage={onEditImage}
        />
      </CenterModal>
      <UploadPictureContainer>
        <PictureContainer
          onClick={() => inputRef.current?.click()}
          $hasImage={!!url}
        >
          {url ? (
            <img src={url} />
          ) : (
            <div>
              <img src={blankAvatar} />
              <div className="add-icon">
                <FaPlus />
              </div>
            </div>
          )}
        </PictureContainer>
        <input
          type="file"
          id={props?.id || "file-input"}
          ref={inputRef}
          style={{ display: "none" }}
          multiple={false}
          accept="image/png, image/gif, image/jpeg"
          onChange={onGetImage}
          {...register}
          {...props}
        />
        {error && <div className="error-container">{error}</div>}
      </UploadPictureContainer>
    </>
  );
};

export default PictureInput;
