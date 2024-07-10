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

  &:hover {
    background-color: ${({ theme }) => theme.colors.grayscale.gray_10};
  }
`;
const addStyle = css`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.brand.black};
`;

const errorStyle = css`
  background-color: ${({ theme }) => theme.colors.support.error};
  color: ${({ theme }) => theme.colors.brand.white};
`;

const deleteStyle = css`
  border: 1px solid red;
  color: ${({ theme }) => theme.colors.support.error};
  ${({ theme }) => theme.font.p.small};

  &:hover {
    background-color: ${({ theme }) => theme.colors.support.error};
    color: white;
  }
`;

const editStyle = css`
  color: ${({ theme }) => theme.colors.brand.light_blue};
  border: 1px solid;
  ${({ theme }) => theme.font.p.small};

  &:hover {
    background-color: ${({ theme }) => theme.colors.brand.light_blue};
    color: white;
  }
`;

const confirmStyle = css`
  border: 1px solid;
  color: ${({ theme }) => theme.colors.support.success};
  ${({ theme }) => theme.font.p.small};

  &:hover {
    background-color: ${({ theme }) => theme.colors.support.success};
    color: white;
  }
`;

const styles = {
  primary: primaryStyle,
  error: errorStyle,
  text: textStyle,
  add: addStyle,
  delete: deleteStyle,
  edit: editStyle,
  confirm: confirmStyle,
};

export const ButtonsLoginContainer = styled.button<buttonProps>`
  padding: 0.5em 0.8em;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: 0.4s;

  ${({ $buttonStyles }) => styles[$buttonStyles]}
`;
