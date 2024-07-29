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
      color: ${({ theme }) => theme.colors.grayscale.gray_80};
    }
  }

  .sectors-list {
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1em;
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

    #fileInput {
      display: none;
    }

    .label-container {
      border: solid red 1px;
      border-radius: 12px;
      padding: 20px;
      cursor: pointer;
    }

    .file-list {
      width: 100%;
      padding: 0.8em 0.8em;
      color: ${({ theme }) => theme.colors.grayscale.gray_30};
      ${({ theme }) => theme.font.p.normal};
      border-radius: 0.5em;
      border: 1px solid;
    }

    .file-item {
      display: flex;
      gap: 8px;
      align-items: center;

      p {
        justify-content: center;
      }
    }
  }
`;
