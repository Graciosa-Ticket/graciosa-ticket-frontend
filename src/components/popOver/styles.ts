import styled, { css, keyframes } from "styled-components";
import { Content, Root } from "@radix-ui/react-popover";
import { modalProps } from "../modal/styles";

const openAnimation = keyframes`

from{
    transform: scale(0) rotateX(90deg);
}
to{
    transform: scale(1) rotateX(0deg);
}

`;

const closeAnimation = keyframes`

from{
    transform: scale(1) rotateX(0deg);
}
to{
    transform: scale(0) rotateX(90deg);
}

`;

export const StyledPopOverRoot = styled(Root)`
  position: relative;
  z-index: 99;
`;
export const StyledPopOverContent = styled(Content)<modalProps>`
  width: max-content;
  z-index: 99;
  background: ${({ theme }) => theme.colors.brand.white};
  transition: 0.3s;
  box-shadow: 0px 0.4em 1em -0.1em rgba(22, 23, 24, 0.55),
    0px 0.7em 20px -15px rgba(22, 23, 24, 0.2);
  display: flex;
  border-radius: 0.5em;

  ${({ $closeAnimation }) => {
    if ($closeAnimation) {
      return css`
        animation: 0.4s ${closeAnimation} ease forwards !important;
      `;
    }
    return css`
      animation: 0.4s ${openAnimation} ease !important;
    `;
  }}
`;
