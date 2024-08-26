import styled from "styled-components";

export const FaqModalComponent = styled.section`
  gap: 20px;
  padding: 20px;

  @media (max-height: 750px) {
    overflow-y: auto;
    max-height: 60vh;
  }

  .faq-div {
    border-bottom: 1px solid #e9eaea;
    margin-bottom: 20px;
    h2 {
      ${({ theme }) => theme.font.p.small};
      color: ${({ theme }) => theme.colors.brand.dark_blue};
      font-weight: 600;
    }

    p {
      max-width: 500px;
      display: block;
      ${({ theme }) => theme.font.p.extra_small};
      color: ${({ theme }) => theme.colors.grayscale.gray_80};
      padding: 10px;
    }
  }
`;
