import styled, { css, keyframes } from "styled-components";

export const ModalContentBody = styled.main`
  width: 100%;
  min-width: 80vw;
  height: calc(100vh - 100px);
  display: flex;
  padding: 0 25px 25px;

  @media (max-width: 950px) {
    grid-template-columns: 1fr; /* Ajuste a coluna para telas menores */
    grid-template-rows: auto; /* Ajuste as linhas para telas menores */
    padding: 10px; /* Ajuste o padding para telas menores */
  }

  .img-sector {
    margin-top: 20px;
  }

  .user-avatar {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 50%;
  }

  .ticket-content-side {
    display: flex;
    flex-basis: 500px;
    flex-direction: column;
    overflow-y: auto;
    border-right: 1px solid ${({ theme }) => theme.colors.grayscale.gray_10};
    padding: 20px 10px 0 0;

    .ticket-content-header {
      display: grid;
      grid-template-columns: 1fr 150px;
      align-items: flex-start;
      justify-content: space-between;
      gap: 1em;

      h2 {
        ${({ theme }) => theme.font.p.large_bold};
        color: ${({ theme }) => theme.colors.brand.dark_blue};
        font-weight: 600;
      }

      .right-side {
        span {
          text-align: right;
          ${({ theme }) => theme.font.p.extra_small};
          color: ${({ theme }) => theme.colors.grayscale.gray_80};
        }
      }
    }

    .description {
      margin-top: 40px;
      ${({ theme }) => theme.font.p.small};
      color: ${({ theme }) => theme.colors.grayscale.gray_70};
    }

    .details-header {
      margin-top: 30px;
      ${({ theme }) => theme.font.p.large};
      color: ${({ theme }) => theme.colors.brand.dark_blue};
      font-weight: 600;
      border-top: ridge;
      border-top-color: ${({ theme }) => theme.colors.grayscale.gray_05};
    }
  }

  p {
    ${({ theme }) => theme.font.p.extra_small};
    color: ${({ theme }) => theme.colors.grayscale.gray_50};
    font-weight: 500;
  }

  h3 {
    margin-top: 20px;
    ${({ theme }) => theme.font.p.medium};
    color: ${({ theme }) => theme.colors.grayscale.gray_90};
    font-weight: 600;
  }

  .layout {
    display: grid;
    grid-template-columns: 200px 1fr 1fr;
    margin-top: 20px;
  }

  .images-Section {
    display: flow-root;
  }

  .comment-section {
    margin-left: 10px;
    flex-basis: 400px;
    flex-grow: 1;
    background-color: ${({ theme }) => theme.colors.grayscale.gray_10};
    padding: 1em;
    border-radius: 1em;
    display: flex;
    flex-direction: column;

    .comment-section-header {
      h6 {
        ${({ theme }) => theme.font.p.normal_bold};
        color: ${({ theme }) => theme.colors.grayscale.gray_80};
      }
    }
  }

  .buttons-content {
    display: flex;
    gap: 20px;
    padding: 1em;
    margin-top: auto;
    justify-content: flex-end;
    box-shadow: 0 -25px 30px -30px rgba(0, 0, 0, 0.2);
  }
`;

export const ModalHeaderSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.grayscale.gray_70};

  span {
    ${({ theme }) => theme.font.p.extra_small};
    color: inherit;
  }
`;

export const ChatContainer = styled.section`
  height: calc(100% - 70px);

  .chat-container {
    height: 100%;
    display: flex;
    margin-top: auto;
  }
  .chat-list {
    width: 100%;
    height: 100%;
    margin-top: auto;
    overflow-y: auto;

    li {
      padding: 3px 0;
      display: grid;
    }
  }

  .chat-input-container {
    display: flex;
    align-items: center;
    gap: 0.7em;

    .textarea {
      width: 100%;
      display: block;
      max-height: 120px;
      background-color: ${({ theme }) => theme.colors.grayscale.gray_05};
      overflow-y: auto;
      padding: 0.7em;
      border: 1px solid ${({ theme }) => theme.colors.grayscale.gray_20};
      color: ${({ theme }) => theme.colors.brand.black};
      border-radius: 0.5em;
      ${({ theme }) => theme.font.p.small};
      position: relative;

      &.empty-textarea::before {
        content: attr(data-placeholder);
        ${({ theme }) => theme.font.p.small};
        position: absolute;
        color: ${({ theme }) => theme.colors.grayscale.gray_60};
      }
    }

    .input-button-container {
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      gap: 0.2em;
      justify-content: center;
      align-items: center;

      button {
        padding: 0.7em;
      }
    }
  }
`;

const chatAppearingAnimation = keyframes`

from{
  scale: 0;
}
to{
  scale: 1;
}

`;

interface chatCardProps {
  $self: boolean;
  $newStyle?: boolean;
}

export const ChatCardContainer = styled.div<
  chatCardProps & { $isDone?: boolean }
>`
  max-width: 90%;
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.7em;
  position: relative;
  padding: 0.5em 0.8em 0.5em 0.5em;
  animation: 0.2s ${chatAppearingAnimation} ease-in;
  margin-right: 8px;

  &::after {
    width: 15px;
    height: 15px;
    position: absolute;
    bottom: -9px;
    transform: rotate(45deg);
  }

  .data-side {
    display: flex;
    align-items: center;
  }

  .user-side {
    display: flex;
    align-items: center;
    gap: 0.5em;
  }

  .message-container {
    width: 100%;
    word-wrap: break-word;
  }

  .conclusion-message {
    ${({ theme }) => theme.font.p.normal};
    color: ${({ $self, theme }) =>
      $self ? theme.colors.brand.white : theme.colors.grayscale.gray_80};
    margin-bottom: 0.5em; // Ajuste o espaçamento conforme necessário
    font-weight: 600;
    max-width: 250px;
  }

  ${({ $self }) => {
    if ($self) {
      return css`
        transform-origin: right;
        justify-self: flex-end;
        flex-direction: column;
        background-color: ${({ theme }) => theme.colors.brand.blue};
        border-radius: 6px 2px 6px 6px;

        .header {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          width: 100%;
          color: ${({ theme }) => theme.colors.brand.white};
          gap: 20px;

          h1 {
            color: white;
            ${({ theme }) => theme.font.p.extra_small};
          }

          span {
            color: white;
            ${({ theme }) => theme.font.p.small};
            font-weight: 600;
          }
        }

        .message-container {
          flex: 1;
          ${({ theme }) => theme.font.p.normal};
          color: ${({ theme }) => theme.colors.grayscale.gray_80};
          max-width: 250px;
        }

        p {
          color: white;
          ${({ theme }) => theme.font.p.small};
        }
      `;
    }

    return css`
      transform-origin: left;
      border-radius: 2px 6px 6px 6px;
      background-color: ${({ theme }) => theme.colors.brand.white};

      .header {
        display: flex;
        justify-content: left;
        flex-direction: row-reverse;
        align-items: center;
        width: 100%;
        color: white !important;
        gap: 20px;

        h1 {
          color: ${({ theme }) => theme.colors.grayscale.gray_50};
          ${({ theme }) => theme.font.p.extra_small};
        }

        span {
          color: ${({ theme }) => theme.colors.grayscale.gray_90};
          ${({ theme }) => theme.font.p.small};
          font-weight: 600;
        }
      }

      .message-container {
        flex: 1;
        ${({ theme }) => theme.font.p.normal};
        color: ${({ theme }) => theme.colors.grayscale.gray_80};
        max-width: 250px;
      }

      p {
        color: ${({ theme }) => theme.colors.grayscale.gray_80};
        ${({ theme }) => theme.font.p.small};
      }
    `;
  }}

  ${({ $isDone, theme }) =>
    $isDone &&
    css`
      border: 4px solid ${theme.colors.support.success};
    `}
`;
