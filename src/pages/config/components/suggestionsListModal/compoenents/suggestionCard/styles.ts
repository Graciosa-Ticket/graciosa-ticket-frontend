import styled, { keyframes } from "styled-components";

const entranceAnimation = keyframes`
  from {
    transform: scale(0.8); /* Inicia com o card 20% menor */
    opacity: 0;
  }
  to {
    transform: scale(1); /* Cresce para o tamanho normal */
    opacity: 1;
  }
`;

export const FeedbackContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) =>
    theme.colors.brand.dark_blue}; /* Fundo escuro */
  border-radius: 15px;
  padding: 10px;
  box-shadow: 0 4px 20px -3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out; /* Transição para a transformação e a sombra */
  align-items: center;
  animation: 0.5s ${entranceAnimation} ease; /* Aplica a animação de entrada */
  max-width: 500px;
  color: ${({ theme }) =>
    theme.colors.brand.white}; /* Texto branco para contraste */

  &:hover {
    transform: scale(1.03); /* Cresce 3% a mais ao passar o mouse */
    box-shadow: 0 8px 30px -5px rgba(0, 0, 0, 0.2); /* Aumenta a sombra para dar um efeito de destaque */
  }

  .top-feedbackViewer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }

  .like-icon {
    flex-shrink: 0;
    font-size: 2em;
    color: ${({ theme }) => theme.colors.support.success};
  }

  .comment {
    text-align: left;
    ${({ theme }) => theme.font.p.small};
    flex-grow: 1;
    word-wrap: break-word;
  }
`;
