import styled from "styled-components";
import * as Checkbox from "@radix-ui/react-checkbox";

const errorColor = ({ theme }: any) => theme.colors.alert_failure;

interface ContainerProps {
  maxWidth?: number;
  readonly?: boolean;
  disabled?: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 12px;
  pointer-events: ${(prop) => (prop.readonly || prop.disabled) && "none"};

  label {
    cursor: pointer;
    display: block;
    ${({ theme }) => theme.font.p.small};
    color: ${({ theme }) => theme.colors.grayscale.gray_80};
  }

  p {
    color: ${errorColor};
    ${({ theme }) => theme.font.p.small}
  }
`;

export const CheckboxRoot = styled(Checkbox.Root)`
  width: 16px;
  height: 16px;
  background: ${({ theme }) => theme.colors.brand.white};
  border: solid 1px ${({ theme }) => theme.colors.brand.blue};
  border-radius: 4px;
  cursor: pointer;
  padding: 0;

  &[aria-checked="true"] {
    border: 0;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
    background: ${({ theme }) => theme.colors.brand.blue};
  }
`;

export const CheckboxIndication = styled(Checkbox.Indicator)`
  color: ${({ theme }) => theme.colors.brand.white};
  cursor: pointer;
`;
