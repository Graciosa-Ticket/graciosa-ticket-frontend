import ReactImageMagnify from "react-image-magnify";

interface ImageMagnifierProps {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
}

function ImageMagnifier(props: ImageMagnifierProps): JSX.Element {
  const { src, alt = "", width = "550px" } = props;

  return (
    <div style={{ position: "relative", width }}>
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
            height: 1800,
          },
          enlargedImageContainerDimensions: {
            width: "200%",
            height: "200%",
          },
          enlargedImageContainerStyle: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            overflow: "hidden",
            pointerEvents: "none",
            maxWidth: "100vw",
            maxHeight: "100vh",
            zIndex: 10,
          },
        }}
      />
    </div>
  );
}

export default ImageMagnifier;
