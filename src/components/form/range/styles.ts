import styled from "styled-components";
import * as Slider from "@radix-ui/react-slider";

export const Container = styled.div`
  width: 100%;
`;

export const RangeRoot = styled(Slider.Root)`
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  position: relative;
`;
export const RangeTrack = styled(Slider.Track)`
  width: 100%;
  height: 2px;
  border-radius: 99px;
  position: relative;
  background: ${({ theme }) => theme.colors.grayscale.gray_10};
`;

export const RangeRange = styled(Slider.Range)`
  height: 100%;
  position: absolute;
  border-radius: 99px;
  background: ${({ theme }) => theme.colors.brand.blue};
`;
export const RangeThumb = styled(Slider.Thumb)`
  width: 20px;
  height: 20px;
  display: block;
  border-radius: 99px;
  background: ${({ theme }) => theme.colors.brand.blue};
  cursor: pointer;

  &:focus {
    box-shadow: 0 0 0.4em rgba(0, 0, 0, 0.3);
  }
`;
