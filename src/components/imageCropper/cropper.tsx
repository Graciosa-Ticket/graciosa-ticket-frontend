/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import getCroppedImg from "../../utils/cropImage";
import Cropper, { Area } from "react-easy-crop";
import { CroppContainer } from "./styles";
import RangeComponent from "../form/range";
import ButtonComponent from "../buttons";

interface editImgProp {
  imageUrl: string;
  onClose: () => void;
  setNewImage: (image: string) => void;
  cropShape?: "round" | "rect";
}

const ImageCropperEdit = ({
  imageUrl,
  onClose,
  setNewImage,
  cropShape = "rect",
}: editImgProp) => {
  const [loading, setLoading] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<any>(2);
  const [aspect, setAspect] = useState(4 / 3);
  const [croppedArea, setCroppedArea] = useState<Area>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setTimeout(() => {
      setAspect(1);
    }, 500);
  }, [imageUrl]);

  const onCropComplete = (_croppedArea: Area, croppedAreaInPixels: Area) => {
    setCroppedArea(croppedAreaInPixels);
  };

  const onCropImage = async () => {
    setLoading(true);
    const croppedUrl: any = await getCroppedImg(imageUrl, croppedArea);
    setNewImage(croppedUrl);
    onClose();
  };

  return (
    <CroppContainer>
      <div className="cropp-container">
        <Cropper
          image={imageUrl}
          aspect={aspect}
          crop={crop}
          zoom={zoom}
          cropShape={cropShape}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          minZoom={1}
          maxZoom={5}
        />
      </div>
      <div className="controls">
        <div className="range-input-container">
          <RangeComponent
            min={1}
            max={5}
            step={0.1}
            onChange={(e: any) => setZoom(e)}
            value={[zoom]}
          />
        </div>
        <div className="buttons-container">
          <ButtonComponent
            buttonStyles="text"
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </ButtonComponent>
          <ButtonComponent onClick={onCropImage} isLoading={loading}>
            Salvar
          </ButtonComponent>
        </div>
      </div>
    </CroppContainer>
  );
};

export default ImageCropperEdit;
