import { useEffect, useState } from "react";
import ReactImageMagnify from "react-image-magnify";

interface ImageMagnifierProps {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
}

function ImageMagnifier(props: ImageMagnifierProps): JSX.Element {
  const { src, alt = "" } = props;
  const [imageWidth, setImageWidth] = useState<string>("400px");
  const [zoomDimensions, setZoomDimensions] = useState({
    width: 1200,
    height: 1200,
  });

  const [enlargedDimensions, setEnlargedDimensions] = useState({
    width: "120%",
    height: "120%",
  });

  useEffect(() => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      if (img.naturalHeight > img.naturalWidth) {
        setImageWidth("300px"); // Ajuste para formato vertical
        setZoomDimensions({ width: 600, height: 800 });
        setEnlargedDimensions({ width: "80%", height: "90%" });
      } else {
        setImageWidth("700px");
        setZoomDimensions({ width: 1200, height: 1200 });
        setEnlargedDimensions({ width: "120%", height: "120%" });
      }
    };
  }, [src]);

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
            width: zoomDimensions.width,
            height: zoomDimensions.height,
          },
          enlargedImageContainerDimensions: {
            width: enlargedDimensions.width,
            height: enlargedDimensions.height,
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
