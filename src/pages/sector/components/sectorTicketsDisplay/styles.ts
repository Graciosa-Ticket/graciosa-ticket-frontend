import styled, { css } from "styled-components";
import { TicketModel } from "../../../../models/ticket";

export const Layout = styled.section`
  display: grid;
  grid-template-columns: 1fr 25px;
  margin-top: 10px;
  gap: 4px;

  p {
    color: ${({ theme }) => theme.colors.brand.white};
  }

  span {
    color: ${({ theme }) => theme.colors.brand.dark_blue};
    ${({ theme }) => theme.font.p.large};
  }
`;

interface StatusPProps {
  status: TicketModel["status"];
}

const openStyle = css`
  background-color: ${({ theme }) => theme.colors.ticket_status.open};
`;

const onGoingStyle = css`
  background-color: ${({ theme }) => theme.colors.ticket_status.on_going};
`;

const reOpenStyle = css`
  background-color: ${({ theme }) => theme.colors.ticket_status.re_open};
`;

const canceledStyle = css`
  background-color: ${({ theme }) => theme.colors.ticket_status.canceled};
`;

const waitingApprovalStyle = css`
  background-color: ${({ theme }) =>
    theme.colors.ticket_status.waiting_approval};
`;

const impedimentStyle = css`
  background-color: ${({ theme }) => theme.colors.ticket_status.impediment};
`;

const doneStyle = css`
  background-color: ${({ theme }) => theme.colors.ticket_status.done};
`;

const statusStyle = {
  ["Aberto"]: openStyle,
  ["Em andamento"]: onGoingStyle,
  ["Aguardando aprovação"]: waitingApprovalStyle,
  ["Cancelado"]: canceledStyle,
  ["Reaberto"]: reOpenStyle,
  ["Impeditivo"]: impedimentStyle,
  ["Concluído"]: doneStyle,
};

export const StatusP = styled.p<StatusPProps>`
  ${({ status }) => statusStyle[status]}
  width: max-content;
  line-height: 1em;
  padding: 0.4em 0.9em;
  border-radius: 8px;
  position: relative;
`;
