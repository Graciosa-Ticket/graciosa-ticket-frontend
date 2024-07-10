import styled from "styled-components";

export const InputPlaceholderContainer = styled.div`
  height: fit-content;
  padding: 0.3em 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayscale.gray_20};

  .label {
    ${({ theme }) => theme.font.p.extra_small};
    color: ${({ theme }) => theme.colors.grayscale.gray_60};
  }

  .content {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 4px;

    .value-container {
      flex: 1;
      ${({ theme }) => theme.font.p.normal};
      font-weight: 500;
      color: ${({ theme }) => theme.colors.brand.dark_blue};
    }

    .affix-container {
      ${({ theme }) => theme.font.p.normal};
      font-weight: 600;
      color: ${({ theme }) => theme.colors.grayscale.gray_60};
    }
  }
`;
