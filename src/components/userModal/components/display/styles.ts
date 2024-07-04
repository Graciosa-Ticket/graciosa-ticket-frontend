import styled from "styled-components";

export const DisplayComponent = styled.section`
  width: 100%;
  border-radius: 10px; /* ajuste o valor conforme desejado para a curvatura dos cantos */
  border: 1px solid slategray;
  color: white; /* cor do texto */
  padding: 10px; /* espaçamento interno */
  font-size: 15px; /* tamanho da fonte */
  display: flex; /* torna os elementos filhos flexíveis */
  flex-direction: column; /* organiza os elementos em coluna */

  .label {
    color: #858585;
    margin-bottom: 5px; /* adicione espaçamento entre label e content */
  }

  .content {
    font-size: 2em;
    color: #0054a4;
    margin-right: 5px;
  }

  .suffix {
    font-size: 3em;
    color: #858585;
    margin-right: 5px;
  }
`;
