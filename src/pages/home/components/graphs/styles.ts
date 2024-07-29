import styled from "styled-components";

export const HomeGraphContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-column: span 2;
  gap: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayscale.gray_10};
  padding-bottom: 2em;
  align-items: center;
  justify-content: center;

  .bar-chart {
    border-radius: 0.5em;
    padding: 1em;
  }

  .revenueCard {
    width: 92%;
    height: 20rem;
  }

  .customerCard {
    width: 50%;
    height: 20rem;
  }

  .big-numbers {
    .section-header {
      h1 {
        ${({ theme }) => theme.font.h1};
        color: ${({ theme }) => theme.colors.grayscale.gray_90};
        font-weight: 700;
      }
    }

    .big-numbers-list {
      margin-top: 2em;
      display: flex;
      gap: 2em;
      align-items: center;
      justify-content: center;

      li {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        max-width: 150px;

        p {
          ${({ theme }) => theme.font.p.large_bold};
          color: ${({ theme }) => theme.colors.grayscale.gray_90};
        }

        span {
          ${({ theme }) => theme.font.p.small};
          color: ${({ theme }) => theme.colors.grayscale.gray_90};
        }
      }
    }
  }
`;
