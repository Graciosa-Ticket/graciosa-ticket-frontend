import styled from "styled-components";

export const HomeGraphContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 2fr));
  grid-column: span 2;
  gap: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayscale.gray_10};
  padding-bottom: 2em;
  align-items: center;
  justify-content: center;

  .bar-chart {
    width: 80%;
    border-radius: 0.5em;
    padding: 1em;
    grid-column: span 2;
    justify-self: center;
  }

  .big-numbers {
    .section-header {
      h1 {
        ${({ theme }) => theme.font.h2};
        color: ${({ theme }) => theme.colors.brand.dark_blue};
        font-weight: 700;
        margin-left: 50px;
      }
    }

    .big-numbers-list {
      margin-top: 1em;
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
          ${({ theme }) => theme.font.h3};
          color: ${({ theme }) => theme.colors.brand.dark_blue};
          font-weight: 700;
          text-align: center; /* Centraliza os números */
          line-height: 1; /* Alinha melhor o texto numerico */
        }

        span {
          ${({ theme }) => theme.font.p.small};
          color: ${({ theme }) => theme.colors.brand.dark_blue};
          text-align: center; /* Centraliza o texto */
          display: inline-block;
          max-width: 100%; /* Garante que o texto respeite a largura do contêiner */
          overflow-wrap: break-word; /* Permite quebra de linha em palavras longas */
          white-space: pre-wrap; /* Mantém os espaços em branco e quebras de linha */
        }
      }

      .sl {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        max-width: 150px;
        margin-top: 20px;

        p {
          ${({ theme }) => theme.font.h3};
          color: ${({ theme }) => theme.colors.brand.dark_blue};
          font-weight: 700;
          text-align: center; /* Centraliza os números */
          line-height: 1; /* Alinha melhor o texto numerico */
        }

        span {
          ${({ theme }) => theme.font.p.small};
          color: ${({ theme }) => theme.colors.brand.dark_blue};
          text-align: center; /* Centraliza o texto */
          display: inline-block;
          max-width: 100%; /* Garante que o texto respeite a largura do contêiner */
          overflow-wrap: break-word; /* Permite quebra de linha em palavras longas */
          white-space: pre-wrap; /* Mantém os espaços em branco e quebras de linha */
        }
      }
    }
  }
`;
