import styled, { keyframes } from "styled-components";

// Defina a animação para aparecer com um efeito de fade
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const FeedbackContainer = styled.div`
  width: 100%;
  padding: 10px;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  align-items: center;
  max-width: 500px;
  color: ${({ theme }) => theme.colors.grayscale.gray_80};
  border-bottom: 1px solid #e9eaea;

  /* Aplica a animação de fade-in ao container com uma duração de 1.5 segundos */
  animation: ${fadeIn} 1.5s ease-out;

  .top-feedbackViewer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }

  .comment {
    text-align: left;
    ${({ theme }) => theme.font.p.small};
    flex-grow: 1;
    word-wrap: break-word;
  }

  .right-side {
    .icons-div {
      display: flex;
      gap: 12px;
      margin-bottom: 20px;

      .trash-icon,
      .check-icon {
        transition: transform 0.6s ease, color 0.6s ease; /* Suaviza a transição da escala e da cor */
        cursor: pointer;

        &:hover {
          transform: scale(1.6); /* Aumenta o ícone em 20% */
        }
      }

      .trash-icon:hover {
        color: ${({ theme }) =>
          theme.colors.support.error}; /* Muda a cor para vermelho */
      }

      .check-icon:hover {
        color: ${({ theme }) =>
          theme.colors.support.success}; /* Muda a cor para verde */
      }
    }

    p {
      ${({ theme }) => theme.font.p.extra_small};
      color: ${({ theme }) => theme.colors.grayscale.gray_80};
    }
  }
`;
