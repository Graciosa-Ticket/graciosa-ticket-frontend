import styled from "styled-components";

export const ModalContentBody = styled.main`
  height: 100%;
  display: grid;
  grid-template-columns: 500px 400px;
  grid-template-rows: 1fr;
  padding: 0 25px 25px;

  .ticket-content-side {
    border-right: 1px solid ${({ theme }) => theme.colors.grayscale.gray_10};
    padding: 20px 10px 0 0;

    .ticket-content-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1em;

      h2 {
        ${({ theme }) => theme.font.p.large_bold};
        color: ${({ theme }) => theme.colors.brand.dark_blue};
      }

      .right-side {
        span {
          ${({ theme }) => theme.font.p.small};
          color: ${({ theme }) => theme.colors.grayscale.gray_80};
        }
      }
    }

    .description {
      margin-top: 1em;
      ${({ theme }) => theme.font.p.small};
      color: ${({ theme }) => theme.colors.grayscale.gray_70};
    }

    .details-section {
      margin-top: 20px;
      .details-header {
        h6 {
          ${({ theme }) => theme.font.p.small_bold};
          color: ${({ theme }) => theme.colors.brand.dark_blue};
        }
      }
    }
  }

  .comment-section {
    margin-left: 10px;
    background-color: ${({ theme }) => theme.colors.grayscale.gray_10};
    padding: 1em;
    border-radius: 1em;

    .comment-section-header {
      h6 {
        ${({ theme }) => theme.font.p.normal_bold};
        color: ${({ theme }) => theme.colors.grayscale.gray_80};
      }
    }
  }
`;

export const ModalHeaderSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.grayscale.gray_70};

  span {
    ${({ theme }) => theme.font.p.extra_small};
    color: inherit;
  }
`;
