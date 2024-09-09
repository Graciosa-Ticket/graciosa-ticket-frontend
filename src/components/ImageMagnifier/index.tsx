import { useEffect, useState } from "react";
import ReactImageMagnify from "react-image-magnify";

interface ImageMagnifierProps {
  src: string;
  alt?: string;
}

function ImageMagnifier(props: ImageMagnifierProps): JSX.Element {
  const { src, alt = "" } = props;
  const [imageWidth, setImageWidth] = useState<string>("350px");

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      if (img.naturalHeight > img.naturalWidth) {
        // Imagem no formato vertical (celular)
        setImageWidth("350px");
      } else {
        // Imagem no formato horizontal (normal)
        setImageWidth("700px");
      }

      setIsImageLoaded(true);
    };
  }, [src]);

  if (!isImageLoaded) {
    return <div>Carregando imagem...</div>;
  }

  return (
    <div style={{ position: "relative", width: imageWidth }}>
      <ReactImageMagnify
        {...{
          smallImage: {
            alt,
            isFluidWidth: true,
            src,
          },
          largeImage: {
            src,
            width: 1200,
            height: 1200,
          },
          enlargedImageContainerDimensions: {
            width: "100%",
            height: "100%",
          },
          enlargedImageContainerStyle: {
            position: "absolute",
            top: "0%",
            left: "0%",
            overflow: "hidden",
            pointerEvents: "none",
            zIndex: 10,
          },
        }}
      />
    </div>
  );
}

export default ImageMagnifier;
