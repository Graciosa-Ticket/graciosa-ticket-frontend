// src/components/ImageViewerModalComponent.ts
import styled from "styled-components";

export const ImageViewerModalComponent = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
  border-radius: 15px;

  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1;
  }
`;
