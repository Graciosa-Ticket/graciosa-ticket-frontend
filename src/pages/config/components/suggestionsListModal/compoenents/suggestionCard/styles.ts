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
  padding: 10px;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  align-items: center;
  max-width: 500px;
  color: ${({ theme }) => theme.colors.grayscale.gray_80};
  border-bottom: 1px solid #e9eaea;

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
