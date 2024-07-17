import styled, { css } from "styled-components";
import ButtonComponent from "../../buttons";

export const UploadPictureContainer = styled.div``;

interface pictureContainerProps {
  $hasImage: boolean;
}

export const PictureContainer = styled(ButtonComponent)<pictureContainerProps>`
  width: 90px;
  height: 90px;
  background-color: transparent;
  border-radius: 99px;
  padding: 0px;
  margin: 0 auto;
  position: relative;

  ${({ $hasImage }) => {
    if ($hasImage) {
      return css`
        border: solid 1px ${({ theme }) => theme.colors.brand.white};
        box-shadow: 0 0.2em 0.7em -5px rgba(0, 0, 0, 0.35),
          0 1px 20px -3px rgba(0, 0, 0, 0.1);
      `;
    }
  }}

  .add-icon {
    position: absolute;
    border-radius: 99px;
    padding: 0.4em;
    background-color: ${({ theme }) => theme.colors.brand.white};
    border: solid 1px ${({ theme }) => theme.colors.brand.blue};
    right: -0.2em;
    bottom: -0.2em;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.brand.blue};

    svg {
      width: 15px;
      height: 15px;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 99px;
  }
`;
