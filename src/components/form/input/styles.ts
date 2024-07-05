import styled, { css } from "styled-components";
import { inputStyle } from ".";

const primary = css`
  ${({ theme }) => {
    return css`
      background-color: ${theme.colors.support.support_01_light};
      border: 1px solid ${theme.colors.grayscale.gray_10};
      ${theme.font.p.normal};
      color: ${theme.colors.grayscale.gray_60};
    `;
  }}
`;
const secondary = css`
  ${({ theme }) => {
    return css`
      background-color: transparent;
      border: 1px solid ${theme.colors.grayscale.gray_90};
      ${theme.font.p.normal};
      color: ${theme.colors.grayscale.gray_60};
    `;
  }}
`;

export const errorStyle = css`
  ${({ theme }) => {
    return css`
      input {
        color: ${theme.colors.support.error};
      }
      .input-container {
        background-color: transparent;
        border: 1px solid;
        ${theme.font.p.normal};
        color: ${theme.colors.support.error};
      }
    `;
  }}
`;

const styles = {
  primary,
  secondary,
};

interface inputStyleProps {
  $inputStyle: inputStyle;
  $required?: boolean;
  $error?: string;
}

export const InputContainer = styled.div<inputStyleProps>`
  input {
    width: 100%;
    box-sizing: border-box;
    padding: 17px 1.3em;
    text-align: left;
    cursor: pointer;
    justify-content: flex-start;
    color: ${({ theme }) => theme.colors.grayscale.gray_90};
    ${({ theme }) => theme.font.p.normal};
  }

  .input-label {
    ${({ theme }) => theme.font.p.small};
    color: ${({ theme }) => theme.colors.grayscale.gray_70};
    margin-bottom: 0.2em;
    display: block;
  }
  .error-container {
    ${({ theme }) => theme.font.p.small};
    color: ${({ theme }) => theme.colors.support.error};
  }

  .affix-container {
    padding: 0 15px;
  }

  .input-container {
    display: flex;
    align-items: center;
    border-radius: 0.5em;
    position: relative;
    ${({ $inputStyle }) => styles[$inputStyle]}

    ${({ $required, theme }) => {
      if ($required) {
        return css`
          &:after {
            content: attr(data-required-text);
            color: ${theme.colors.grayscale.gray_60};
            background-color: ${({ theme }) => theme.colors.brand.white};
            padding: 0.2em 0.5em;
            border-radius: 0.2em;
            ${({ theme }) => theme.font.p.extra_small};
            position: absolute;
            top: -13px;
            right: 0.9em;
          }
        `;
      }
    }}
  }

  ${({ $error }) => $error && errorStyle}
`;
