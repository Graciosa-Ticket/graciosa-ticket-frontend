import styled, { keyframes } from "styled-components";
import { FormContentContainer } from "../../../../components/form/form";

export const TicketModalComponent = styled.div`
  max-width: 50vw;
  padding: 1em;
  height: 100%;
`;

const fadeInLeft = keyframes`

from{
  opacity: 0;
  transform: translateX(-500px);
}

to{
  opacity: 1;
  transform: translateX(0px);
}

`;

export const ChooseSectorStepContainer = styled.div`
  animation: 0.3s ${fadeInLeft} linear;

  .header {
    h2 {
      text-align: center;
      ${({ theme }) => theme.font.p.small};
      color: ${({ theme }) => theme.colors.brand.dark_blue};
      font-weight: 600;
      margin-top: 30px;
    }
  }

  .sectors-list {
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1em;
    overflow-y: auto;
    max-height: calc(100vh - 80px);
    padding-bottom: 150px;
    padding-top: 10px;
    padding-right: 15px;
    padding-left: 10px;
  }
`;

const fadeInRight = keyframes`
from{
  opacity: 0;
  transform: translateX(500px);
}

to{
  opacity: 1;
  transform: translateX(0px);
}
`;

export const TicketFormContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  transform-origin: right;
  animation: 0.3s ${fadeInRight} linear;

  .content {
    h2 {
      text-align: center;
      ${({ theme }) => theme.font.p.normal_bold};
      color: ${({ theme }) => theme.colors.grayscale.gray_80};
    }
    p {
      text-align: center;
      ${({ theme }) => theme.font.p.small};
      color: ${({ theme }) => theme.colors.grayscale.gray_80};
    }
  }

  .go-back-button {
    margin-top: 20px;
  }

  form {
    width: 100%;
    margin-top: 20px;
    flex: 1;
  }
  .main-form {
    flex: 1;
  }
`;
export const TicketMainFormContainer = styled(FormContentContainer)`
  .file-input-container {
    min-height: 300px;
    color: ${({ theme }) => theme.colors.grayscale.gray_80};
    border-radius: 0.5em;
    display: flex;
    flex-direction: column;

    h3 {
      margin-top: 5px;
      margin-left: 2px;
      margin-bottom: 5px;
      color: ${({ theme }) => theme.colors.grayscale.gray_80};
      ${({ theme }) => theme.font.p.normal};
      font-weight: 500;
    }

    #fileInput {
      display: none;
    }

    .label-container {
      border: solid 1px;
      border-radius: 0.5em;
      padding: 8px;
      cursor: pointer;
      color: ${({ theme }) => theme.colors.grayscale.gray_80};
      ${({ theme }) => theme.font.p.normal};
      width: 50%;
      margin-top: 2px;
      margin-left: 2px;
      text-align: center;

      &:hover {
        background-color: ${({ theme }) => theme.colors.grayscale.gray_80};
        color: ${({ theme }) => theme.colors.brand.white};
        transition: background-color 0.3s ease;
      }
    }

    .file-list {
      width: 80%;
      max-height: 250px;
      padding: 0.8em 0.8em;
      color: ${({ theme }) => theme.colors.grayscale.gray_80};
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
        color: ${({ theme }) => theme.colors.grayscale.gray_80};
        ${({ theme }) => theme.font.p.normal};
      }

      .remove-icon {
        color: ${({ theme }) => theme.colors.grayscale.gray_80};
        cursor: pointer;

        &:hover {
          background-color: ${({ theme }) => theme.colors.grayscale.gray_80};
          color: ${({ theme }) => theme.colors.brand.white};
          transition: background-color 0.3s ease;
        }
      }
    }
  }
`;
