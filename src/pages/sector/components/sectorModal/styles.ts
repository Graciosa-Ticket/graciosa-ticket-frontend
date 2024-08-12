import styled from "styled-components";

export const SectorModalComponent = styled.section`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  padding: 0 15px 15px;
  gap: 10px;
  background-color: ${({ theme }) => theme.colors.brand.white};
  transition: transform 0.2s ease-in-out;
  position: relative;
  margin-top: 25px;

  @media (max-height: 700px) {
    overflow-y: auto;
    max-height: 100vh;
  }

  .select-user-div {
    display: flex;
    align-items: center; /* Alinha verticalmente no centro */
    gap: 10px; /* Adiciona espaço entre os itens */
  }

  .p-button {
    display: flex;
    align-items: center; /* Alinha o conteúdo interno verticalmente no centro */
    justify-content: center; /* Alinha o conteúdo interno horizontalmente no centro */
    color: ${({ theme }) =>
      theme.colors.grayscale.gray_50}; /* Cor do texto e ícone */
    border: 1px solid ${({ theme }) => theme.colors.grayscale.gray_50}; /* Borda do botão */
    border-radius: 0.5em; /* Bordas arredondadas */
    padding: 6px; /* Espaçamento interno */
    gap: 5px; /* Espaço entre o ícone e o texto */
    margin-top: 25px;
    ${({ theme }) => theme.font.p.extra_small};
  }

  .p-button svg {
    transform: rotate(90deg); /* Gira o ícone em 90 graus */
    transition: transform 0.2s ease-in-out; /* Suaviza a transição de rotação */
  }
  h1 {
    margin-top: 15px;
    ${({ theme }) => theme.font.p.small};
    color: ${({ theme }) => theme.colors.brand.dark_blue};
  }

  h3 {
    ${({ theme }) => theme.font.p.normal};
    color: ${({ theme }) => theme.colors.grayscale.gray_80};
    font-weight: 600;
    max-width: 80px;
  }

  .footer {
    display: grid;
    grid-template-columns: 100px 1fr 1fr;
    justify-content: flex-end;
    margin-top: auto;
    gap: 20px;
  }

  .avatar-img {
    width: 60px;
    height: 60px;
  }
`;
