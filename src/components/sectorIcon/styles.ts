import styled from "styled-components";

export const IconComponent = styled.section`
    width: 100%;
    display: flex; /* torna os elementos filhos flexíveis */
    flex-direction: column; /* organiza os elementos em coluna */
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    row-gap: 2em;
    column-gap: 20px;
  .print-sector {
    color: #858585;
    margin-bottom: 5px; /* adicione espaçamento entre label e content */
  }

  .text-sector {
    font-size: 2em;
    color: #0054a4;
    margin-right: 5px;
  }

  .icon-sector {
    display: flex;
    justify-content: center; /* Centraliza horizontalmente */
    align-items: center; /* Centraliza verticalmente */
    margin-top: 200px; /* Exemplo de margem superior para espaçamento */
  }

`;
