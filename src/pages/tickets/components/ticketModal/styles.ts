import styled, { css, keyframes } from "styled-components";

export const ModalContentBody = styled.main`
  width: 75vw;
  height: calc(100vh - 100px);
  display: flex;
  padding: 0 25px 25px;

  @media (max-width: 950px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    padding: 10px;
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
    width: 60%;
    display: flex;
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
        display: flex;
        gap: 4px;
        span {
          display: flex;
          text-align: right;
          ${({ theme }) => theme.font.p.extra_small};
          color: ${({ theme }) => theme.colors.grayscale.gray_80};
          align-items: center;
        }
        .shareButton {
          padding: 2px;
          color: ${({ theme }) => theme.colors.grayscale.gray_70};
        }
      }
    }

    .description {
      margin-top: 40px;
      ${({ theme }) => theme.font.p.small};
      color: ${({ theme }) => theme.colors.grayscale.gray_70};
      white-space: pre-wrap;
      word-wrap: break-word;
    }

    .details-header {
      margin-top: 5em;
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
    width: 40%;
    margin-left: 10px;
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

  .conclusion-header-div.conclusion-header-div {
    text-align: center;
    margin-bottom: 0.5em;
    margin-top: 1.5em;
  }

  .conclusion-header {
    ${({ theme }) => theme.font.p.extra_small};
    color: ${({ theme }) => theme.colors.grayscale.gray_60};
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
  height: calc(100% - 16px);
  display: flex;
  flex-direction: column;

  .chat-container {
    flex: 1;
    overflow: hidden;
    display: flex;
    margin-top: auto;
  }

  .chat-list {
    width: 100%;
    height: 100%;
    margin-top: auto;
    /* display: flex;
    flex-direction: column;
    justify-content: flex-end; */
    overflow-y: scroll;

    li {
      padding: 3px 0;
      display: grid;
    }
  }

  .chat-input-container {
    display: flex;
    align-items: flex-end;
    gap: 0.7em;
    margin-top: 10px;

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

    .file-list {
      width: 80%;
      max-height: 250px;
      padding: 0.8em 0.8em;
      color: ${({ theme }) => theme.colors.grayscale.gray_50};
      ${({ theme }) => theme.font.p.normal};
      border-radius: 0.5em;
      border: 1px solid;
      margin-top: 2px;
      text-align: center;
      overflow-y: auto;
      transition: background-color 0.3s ease, color 0.3s ease;
    }

    .file-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.4em;

      p {
        color: ${({ theme }) => theme.colors.brand.blue};
        ${({ theme }) => theme.font.p.normal};
      }

      .remove-icon {
        color: ${({ theme }) => theme.colors.brand.blue};
        cursor: pointer;

        &:hover {
          background-color: ${({ theme }) => theme.colors.brand.blue};
          color: ${({ theme }) => theme.colors.brand.white};
          transition: background-color 0.3s ease;
        }
      }
    }

    .input-button-container {
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

interface ChatCardProps {
  $self: boolean;
  $newStyle?: boolean;
  $isDone?: boolean;
}
export const ChatCardContainer = styled.div<ChatCardProps>`
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

    .file-list {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;

      li {
        flex-basis: 100px;
        flex-grow: 1;

        &.not-image-container {
          span {
            max-width: 100px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            ${({ theme }) => theme.font.p.extra_small};
            font-size: 10px !important;
          }
        }

        .download-button {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 2em;
          padding: 0.2em;

          &:hover {
            background-color: transparent;
          }

          svg {
            color: inherit;
          }
        }
      }
    }
  }

  .header {
    width: 100%;
    display: flex;
    justify-content: left;
    flex-direction: row-reverse;
    align-items: center;
    color: white;
    gap: 10px;

    h6 {
      color: ${({ theme }) => theme.colors.grayscale.gray_50};
      ${({ theme }) => theme.font.p.extra_small};
      font-size: 0.7em;
    }

    span {
      color: ${({ theme }) => theme.colors.grayscale.gray_90};
      ${({ theme }) => theme.font.p.small};
      font-weight: 500;
    }
  }

  .message-container {
    flex: 1;
    ${({ theme }) => theme.font.p.normal};
    color: ${({ theme }) => theme.colors.grayscale.gray_80};
    max-width: 250px;
  }

  ${({ $self, theme }) => {
    if ($self) {
      return css`
        transform-origin: right;
        justify-self: flex-end;
        flex-direction: column;
        background-color: ${theme.colors.brand.blue};
        border-radius: 6px 2px 6px 6px;

        .header {
          flex-direction: row;

          h6,
          span {
            color: white;
          }
        }

        p {
          color: white;
          ${({ theme }) => theme.font.p.small};
        }

        .message-container .file-list {
          li.not-image-container span {
            color: white;
          }
          .download-button {
            color: white;

            svg {
              color: white;
            }
          }
        }
      `;
    }

    return css`
      transform-origin: left;
      border-radius: 2px 6px 6px 6px;
      background-color: ${theme.colors.brand.white};

      .header {
        color: white !important;
      }

      p {
        color: ${theme.colors.grayscale.gray_80};
        ${({ theme }) => theme.font.p.small};
      }
    `;
  }}

  ${({ $isDone, theme }) =>
    $isDone &&
    css`
      background-color: ${theme.colors.support.success};

      h6,
      span,
      p,
      .message-container,
      .message-container .file-list li.not-image-container span,
      .message-container .file-list .download-button,
      .message-container .file-list .download-button svg {
        color: white;
      }

      .header {
        h6,
        span {
          color: white; /* Força a cor branca no header e na hora */
        }
      }
    `}
`;
