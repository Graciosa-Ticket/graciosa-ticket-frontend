import styled, { css } from "styled-components";

export const CroppContainer = styled.div`
  min-width: 500px;
  padding: 10px;

  .cropp-container {
    width: 500px;
    height: 500px;
    position: relative;
  }

  .controls {
    padding: 0 20px;
    margin-top: 20px;

    .range-input-container {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .buttons-container {
    width: 100%;
    margin-top: 30px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding: 0 20px;
  }
`;

export const ImagesPreviewContainer = styled.div`
  display: grid;

  .main-image {
    width: 400px;
    height: 400px;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .actions-buttons {
      height: 30px;
      left: 0.7em;
      right: 0.7em;
      bottom: 0.7em;
      border-radius: 9px;
      position: absolute;
      z-index: 2;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      background-color: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(3px);

      button {
        flex: 1;
        border-radius: 9px;
        color: ${({ theme }) => theme.colors.brand.white};
        ${({ theme }) => theme.font.p.small};
        transition: 0.3s;

        &:hover {
          background-color: rgba(0, 0, 0, 0.5);
        }
      }
    }
  }

  .image-list {
    max-width: 400px;
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 0.5em;

    .add-new-image {
      width: 50px;
      height: 50px;
      border: solid 2px ${({ theme }) => theme.colors.grayscale.gray_90};
      border-radius: 0.2em;

      svg {
        width: 30px;
      }
    }
  }
`;

interface imageSelectButtonProps {
  $selected: boolean;
}

export const ImageSelectButton = styled.button<imageSelectButtonProps>`
  width: 50px;
  height: 50px;
  background-color: transparent;
  border: 0;
  transition: 0.1s;

  ${({ $selected, theme }) => {
    if ($selected) {
      return css`
        border: solid 3px ${theme.colors.grayscale.gray_90};

        img {
          opacity: 1;
        }
      `;
    }
  }}

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.8;
  }
`;
