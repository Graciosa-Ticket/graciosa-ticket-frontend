import { styled } from "styled-components";
import { theme } from "../../../../../styles/theme";

export const Graph = styled.section`
  width: fit-content;
  min-width: 100%;
  height: 250px;
  display: flex;
  gap: 20px;
  justify-content: space-evenly;
  padding: 0.7em 20px 0.7em 60px;
  position: relative;
  margin-top: 30px;
  overflow-x: auto;

  @media (max-width: 800px) {
    max-width: 500px;
    overflow-x: auto;
  }

  .lines-container {
    flex: 1;
    min-width: 150px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    align-items: center;
    gap: 0.2em;

    &:after {
      content: "";
      top: -0.2em;
      bottom: -0.2em;
      left: -0.2em;
      right: -0.2em;
      border: 1px solid ${({ theme }) => theme.colors.grayscale.gray_30};
      opacity: 0;
      position: absolute;
      border-radius: 0.8em;
      transition: 0.3s;
      pointer-events: none;
    }

    &:hover {
      &:after {
        opacity: 1;
      }
    }

    .lines {
      width: 100%;
      height: 100%;
      position: relative;
      display: flex;
      align-items: flex-end;
      gap: 0.2em;
    }

    .date-indicator {
      ${({ theme }) => theme.font.p.extra_small};
      color: ${({ theme }) => theme.colors.grayscale.gray_70};
    }
  }

  .graph-line-container {
    position: absolute;
    top: 0.7em;
    bottom: 0.7em;
    right: 0;
    left: 0;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    span {
      ${({ theme }) => theme.font.p.extra_small};
      font-size: 0.7em;
      color: ${({ theme }) => theme.colors.grayscale.gray_70};

      &:after {
        content: "";
        display: inline-block;
        height: 1px;
        border-bottom: 1px dashed
          ${({ theme }) => theme.colors.grayscale.gray_10};
        position: absolute;
        right: 0;
        left: 20px;
        z-index: 1;
      }
    }
  }
`;

const releasesType = {
  aberto: theme().colors.ticket_status.open,
  aguardando_aprovacao: theme().colors.ticket_status.waiting_approval,
  cancelado: theme().colors.ticket_status.canceled,
  concluido: theme().colors.ticket_status.done,
  em_andamento: theme().colors.ticket_status.on_going,
  impeditivo: theme().colors.ticket_status.impediment,
  reaberto: theme().colors.ticket_status.re_open,
};

interface relaseGraphItemProps {
  $type:
    | "aberto"
    | "aguardando_aprovacao"
    | "cancelado"
    | "concluido"
    | "em_andamento"
    | "impeditivo"
    | "reaberto";
}

export const GraphItem = styled.div<relaseGraphItemProps>`
  flex: 1;
  height: 0%;
  background-color: ${({ $type }) => releasesType[$type]};
  transition: 0.5s ease-out;
  border-radius: 7px;
  position: relative;
  z-index: 2;
`;
