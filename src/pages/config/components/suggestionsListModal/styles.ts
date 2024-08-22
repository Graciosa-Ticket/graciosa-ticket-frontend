import styled from "styled-components";

export const SuggestionsListModalComponent = styled.section`
  gap: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) =>
    theme.colors.brand.white}; /* Cor de fundo para garantir contraste */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 500px;
  overflow-y: auto;

  .ticket-list {
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%; /* Garante que a lista ocupe toda a largura disponível */
    max-width: 600px; /* Limita a largura dos cards para centralizá-los */
  }
`;
