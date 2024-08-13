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
    ${({ theme }) => theme.font.p.medium};
    color: ${({ theme }) => theme.colors.brand.black};
    line-height: 2;
    padding: 10px;
    gap: 20px;
    font-weight: 500;
  }

  p {
    display: block;
    ${({ theme }) => theme.font.p.large};
    color: ${({ theme }) => theme.colors.brand.black};
    padding: 10px;
    font-weight: 500;
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
