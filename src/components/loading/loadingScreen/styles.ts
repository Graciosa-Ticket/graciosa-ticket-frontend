import styled, { keyframes } from "styled-components";

const pulseAnimation = keyframes`
0%{
scale: 0.9;
}
50%{
    scale: 1;
}
100%{
scale: 0.9;
}
`;

export const LoadingScreenContainer = styled.section`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2em;
  z-index: 9999;

  img {
    max-width: 200px;
    transition: 0.3s;
    animation: 2s ${pulseAnimation} linear infinite;
  }
`;
