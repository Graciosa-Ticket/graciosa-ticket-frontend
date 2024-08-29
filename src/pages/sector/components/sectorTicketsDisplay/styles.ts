import styled, { css } from "styled-components";
import { TicketModel } from "../../../../models/ticket";

export const Layout = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  margin-top: 10px;

  gap: 4px;
  margin-bottom: 20px;

  span {
    color: white;
    ${({ theme }) => theme.font.p.small};
    font-weight: 500;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
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
  width: 100%; /* Garante que o retângulo ocupe toda a largura disponível */
  padding: 10px; /* Remove padding para garantir que a altura seja consistente */
  ${({ status }) => statusStyle[status]}
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: white;
  ${({ theme }) => theme.font.p.extra_small};
  font-weight: 500;

  span {
    ${({ theme }) => theme.font.p.medium_bold};
  }
`;
