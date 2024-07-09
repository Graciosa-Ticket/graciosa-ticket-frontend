import styled, { css, keyframes } from "styled-components";
import { Message } from "./chat";

export const ModalContentBody = styled.main`
  height: 100%;
  display: grid;
  grid-template-columns: 500px 400px;
  grid-template-rows: 1fr;
  padding: 0 25px 25px;

  .ticket-content-side {
    border-right: 1px solid ${({ theme }) => theme.colors.grayscale.gray_10};
    padding: 20px 10px 0 0;

    .ticket-content-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1em;

      h2 {
        ${({ theme }) => theme.font.p.large_bold};
        color: ${({ theme }) => theme.colors.brand.dark_blue};
      }

      .right-side {
        span {
          ${({ theme }) => theme.font.p.small};
          color: ${({ theme }) => theme.colors.grayscale.gray_80};
        }
      }
    }

    .description {
      margin-top: 1em;
      ${({ theme }) => theme.font.p.small};
      color: ${({ theme }) => theme.colors.grayscale.gray_70};
    }

    .details-section {
      margin-top: 20px;
      .details-header {
        h6 {
          ${({ theme }) => theme.font.p.small_bold};
          color: ${({ theme }) => theme.colors.brand.dark_blue};
        }
      }
    }
  }

  .comment-section {
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
  flex: 1;
  display: flex;
  flex-direction: column;

  .chat-container {
    display: flex;
    margin-top: auto;
  }
  .chat-list {
    width: 100%;
    padding: 0 2em;
    margin-top: auto;

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
  $message_type?: Message["type"];
}

export const ChatCardContainer = styled.div<chatCardProps>`
  max-width: 90%;
  width: fit-content;
  display: flex;
  align-items: flex-start;
  gap: 0.7em;
  position: relative;
  padding: 0.5em 0.8em 0.5em 0.5em;
  animation: 0.2s ${chatAppearingAnimation} ease-in;

  &::after {
    width: 15px;
    height: 15px;
    position: absolute;
    bottom: -9px;
    transform: rotate(45deg);
  }

  ${({ $self }) => {
    if ($self) {
      return css`
        transform-origin: right;
        justify-self: flex-end;
        flex-direction: row-reverse;
        background-color: ${({ theme }) => theme.colors.brand.dark_blue};
        border-radius: 6px 2px 6px 6px;

        .message-container {
          text-align: right;
          color: white !important;
        }

        .date-span {
          color: white !important;
          font-size: 11px !important;
        }

        &::after {
          right: 20px;
          bottom: -0.5em;
          background-color: ${({ theme }) => theme.colors.support.support_01};
          border-width: 0 1px 1px 0;
        }
      `;
    }

    return css`
      transform-origin: left;
      border-radius: 2px 6px 6px 6px;
      background-color: ${({ theme }) => theme.colors.grayscale.gray_10};
      .date-span {
        font-size: 11px !important;
      }

      &::after {
        left: 20px;
        background-color: ${({ theme }) =>
          theme.colors.support.support_01_light};
        border: solid ${({ theme }) => theme.colors.grayscale.gray_10};
        border-width: 0 1px 1px 0;
      }
    `;
  }}

  ${({ $message_type }) => {
    if ($message_type === "Notification") {
      return css`
        background-color: transparent !important;
        .date-span.date-span {
          color: ${({ theme }) => theme.colors.grayscale.gray_70} !important;
        }
      `;
    }
  }}

  .message-container {
    flex: 1;
    ${({ theme }) => theme.font.p.normal};
    color: ${({ theme }) => theme.colors.grayscale.gray_80};

    &.info-message {
      font-style: italic;
      font-size: 12px !important;
      margin-bottom: 10px;
      color: ${({ theme }) => theme.colors.grayscale.gray_80} !important;
    }
  }

  .date-span {
    align-self: flex-end;
    ${({ theme }) => theme.font.p.small};
    color: ${({ theme }) => theme.colors.grayscale.gray_70};
  }
`;
