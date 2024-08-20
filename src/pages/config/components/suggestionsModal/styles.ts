import styled from "styled-components";

export const SuggestionsModalComponent = styled.section`
  gap: 20px;
  padding: 20px;

  @media (max-height: 8650px) {
    overflow-y: auto;
    max-height: 60vh;
  }

  p {
    max-width: 400px;
    ${({ theme }) => theme.font.p.normal};
    color: ${({ theme }) => theme.colors.grayscale.gray_80};
    padding: 10px;
    font-weight: 500;
    margin-bottom: 20px;
  }

  .error-message {
    color: ${({ theme }) =>
      theme.colors.support.error}; /* Define a cor do texto de erro */
    margin-top: 5px;
    font-size: ${({ theme }) =>
      theme.font.p
        .small}; /* Ajusta o tamanho da fonte do erro, se necessário */
  }
`;
