import styled, { keyframes } from "styled-components";

// Animação para a transição suave
const fadeInOut = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const FeedBackContainer = styled.section`
  width: 500px;
`;

export const SelectButtonsArea = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.colors.brand.white};
  z-index: 1;
  padding: 0px 20px;
  display: flex;
  gap: 20px;
  width: 100%;
`;

export const SuggestionsListModalComponent = styled.section`
  padding: 8px 20px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.brand.white};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 500px;
  overflow-y: auto;

  .ticket-list {
    width: 100%;
    display: flex;
    margin-top: 12px;
    flex-direction: column;
    padding: 0 6px 0 0;
    overflow-y: auto;

    .time-indicator {
      ${({ theme }) => theme.font.p.extra_small};
      color: ${({ theme }) => theme.colors.grayscale.gray_60};
      font-size: 12px;
    }

    .feedback-item {
      padding: 10px 0;

      .feedback-list {
        li {
          padding: 10px 0;
          & + li {
            border-top: 1px solid #e9eaea;
          }
        }
      }

      & + .feedback-item {
        border-top: 1px solid #e9eaea;
      }
    }

    /* Aplicando animação de fade-in e fade-out */
  }
`;
