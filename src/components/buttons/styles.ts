import styled, { css } from "styled-components";
import { buttonStyles } from ".";

interface buttonProps {
  $buttonStyles: buttonStyles;
}

const primaryStyle = css`
  background-color: ${({ theme }) => theme.colors.brand.blue};
  color: ${({ theme }) => theme.colors.brand.white};
  box-shadow: 0px 4px 6.1px -5px #0000009e;
`;
const textStyle = css`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.brand.black};
`;

const errorStyle = css`
  background-color: ${({ theme }) => theme.colors.support.error};
  color: ${({ theme }) => theme.colors.brand.white};
  box-shadow: 0px 4px 6.1px -5px #0000009e;
`;

const styles = {
  primary: primaryStyle,
  error: errorStyle,
  text:textStyle
};

export const ButtonsLoginContainer = styled.button<buttonProps>`
  padding: 1em;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.4s;

  ${({ $buttonStyles }) => styles[$buttonStyles]}
`;
