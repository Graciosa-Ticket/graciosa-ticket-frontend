import ReactImageMagnify from "react-image-magnify";

interface ImageMagnifierProps {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
}

function ImageMagnifier(props: ImageMagnifierProps): JSX.Element {
  const { src, alt = "", width = "400px" } = props;

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
            height: 1200,
          },
          enlargedImageContainerDimensions: {
            width: "80%",
            height: "80%",
          },
          enlargedImageContainerStyle: {
            position: "absolute",
            top: "0%",
            left: "-50%",
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
