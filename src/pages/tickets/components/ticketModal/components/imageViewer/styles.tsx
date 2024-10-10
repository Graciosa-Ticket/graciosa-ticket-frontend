import styled from "styled-components";

export const ImageViewerContainer = styled.div`
  display: grid;
  gap: 10px;
  align-items: center;
  max-width: 100%;
  cursor: pointer;
`;

export const Thumbnail = styled.img`
  width: 35px;
  height: auto;
  object-fit: cover;
  border-radius: 4px;
`;

export const LoadingText = styled.p`
  font-size: 16px;
  color: #666;
  grid-column: span 3;
  text-align: center;
`;
