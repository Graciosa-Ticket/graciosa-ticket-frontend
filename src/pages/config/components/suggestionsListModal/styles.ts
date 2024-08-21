import styled from "styled-components";

export const SuggestionsListModalComponent = styled.section`
  gap: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 150px; /* Define uma altura mínima para o modal */
  min-width: 200px; /* Define uma largura mínima para o modal */
  background-color: ${({ theme }) =>
    theme.colors.brand.white}; /* Cor de fundo para garantir contraste */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  .ticket-list {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%; /* Garante que a lista ocupe toda a largura disponível */
    max-width: 600px; /* Limita a largura dos cards para centralizá-los */
  }

  @media (max-height: 1200px) {
    overflow-y: auto;
    max-height: 60vh;
  }
`;
