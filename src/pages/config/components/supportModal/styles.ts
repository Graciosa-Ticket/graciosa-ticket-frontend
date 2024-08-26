import styled from "styled-components";

export const SupportModalComponent = styled.section`
  gap: 20px;
  padding: 20px;

  @media (max-height: 650px) {
    overflow-y: auto;
    max-height: 60vh;
  }

  span {
    display: block;
    ${({ theme }) => theme.font.p.normal};
    color: ${({ theme }) => theme.colors.grayscale.gray_80};
    line-height: 2;
    padding: 10px;
    gap: 20px;
    font-weight: 500;
  }

  p {
    display: block;
    ${({ theme }) => theme.font.p.normal};
    color: ${({ theme }) => theme.colors.grayscale.gray_80};
    padding: 10px;
  }
  .icon {
    margin-right: 8px;
    font-weight: 500;
  }

  .copy-icon {
    margin-left: 8px;
    font-weight: 500;
    cursor: pointer;
  }
`;
