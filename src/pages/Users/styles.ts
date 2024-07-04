import styled from "styled-components";

export const UserContainer = styled.section`
  .user-header {
    margin: 10px 0 20px;
    display: flex;
    align-items: center;
    gap: 1em;

    h1 {
      ${({ theme }) => theme.font.h1};
    }
  }

  .sector-selector {
    margin-bottom: 20px; /* Espaçamento abaixo da seção de seleção */
    display: flex;
    gap: 20px; /* Espaçamento entre os botões */
  }

  .user-cards {
    margin-top: 2em;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

`;
