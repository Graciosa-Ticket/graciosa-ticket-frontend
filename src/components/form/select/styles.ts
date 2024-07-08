import * as SelectPrimitive from "@radix-ui/react-select";
import styled from "styled-components";

export const SelectRoot = styled(SelectPrimitive.Root)``;

export const SelectTrigger = styled(SelectPrimitive.Trigger)`
  padding: 0.4em 0.8em;
  background-color: ${({ theme }) => theme.colors.grayscale.gray_10};
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SelectValue = styled(SelectPrimitive.Value)``;

export const SelectContent = styled(SelectPrimitive.Content)`
  background-color: ${({ theme }) => theme.colors.grayscale.gray_10};
  z-index: 999;
  border-radius: 8px;
`;

export const SelectViewport = styled(SelectPrimitive.Viewport)``;

export const SelectItemContainer = styled(SelectPrimitive.Item)`
  padding: 0.4em 0.8em;
  ${({ theme }) => theme.font.p.extra_small};
  color: ${({ theme }) => theme.colors.grayscale.gray_70};
`;

export const SelectItemText = styled(SelectPrimitive.ItemText)`
  ${({ theme }) => theme.font.p.extra_small};
  color: ${({ theme }) => theme.colors.grayscale.gray_70};
`;
