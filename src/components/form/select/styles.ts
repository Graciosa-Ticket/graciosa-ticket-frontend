import * as SelectPrimitive from "@radix-ui/react-select";
import styled, { css, keyframes } from "styled-components";

const openSelectAnimation = keyframes`

from{
transform: rotateX(90deg);
}

to{
    transform: rotateX(0deg);

}

`;

export const SelectRoot = styled(SelectPrimitive.Root)``;

export const SelectTrigger = styled(SelectPrimitive.Trigger)`
  padding: 0.4em 0.8em;
  background-color: ${({ theme }) => theme.colors.grayscale.gray_10};
  border-radius: 8px;
  display: flex;
  ${({ theme }) => theme.font.p.small};
  align-items: center;
  gap: 10px;
`;

export const SelectValue = styled(SelectPrimitive.Value)``;

export const SelectContent = styled(SelectPrimitive.Content)`
  background-color: ${({ theme }) => theme.colors.brand.white};
  z-index: 999;
  border-radius: 8px;
  transform-origin: top;
  animation: 0.2s ${openSelectAnimation} ease-in;
  box-shadow: 0 2px 20px -2px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

export const SelectViewport = styled(SelectPrimitive.Viewport)``;

export const SelectItemContainer = styled(SelectPrimitive.Item)`
  padding: 0.4em 0.8em;
  ${({ theme }) => theme.font.p.small};

  color: ${({ theme }) => theme.colors.grayscale.gray_70};
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.grayscale.gray_10};
  }
`;

export const SelectItemText = styled(SelectPrimitive.ItemText)`
  ${({ theme }) => theme.font.p.small};
  color: ${({ theme }) => theme.colors.grayscale.gray_70};
`;

const scrollStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6em;
  color: ${({ theme }) => theme.colors.grayscale.gray_80};
`;

export const SelectScrollUp = styled(SelectPrimitive.ScrollUpButton)`
  ${scrollStyle}
`;
export const SelectScrollDown = styled(SelectPrimitive.ScrollDownButton)`
  ${scrollStyle}
`;
