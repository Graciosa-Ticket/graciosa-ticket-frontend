import ReactImageMagnify from "react-image-magnify";

interface ImageMagnifierProps {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
}

function ImageMagnifier(props: ImageMagnifierProps): JSX.Element {
  const { src, alt = "", width = "350px" } = props;

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
            height: 800,
          },
          enlargedImageContainerDimensions: {
            width: "120%",
            height: "120%",
          },
          enlargedImageContainerStyle: {
            position: "absolute",
            top: "120%",
            left: "-12%",
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
