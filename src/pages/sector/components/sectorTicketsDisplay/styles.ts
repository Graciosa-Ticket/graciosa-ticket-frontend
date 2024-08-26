import styled, { css } from "styled-components";
import { TicketModel } from "../../../../models/ticket";

export const Layout = styled.section`
  display: grid;
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
  ${({ status }) => statusStyle[status]}
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%; /* Garante que o retângulo ocupe toda a largura disponível */
  min-width: 120px; /* Define um tamanho mínimo para manter consistência entre os elementos */
  height: 40px; /* Define uma altura padrão para todos os retângulos */
  padding: 0; /* Remove padding para garantir que a altura seja consistente */
  border-radius: 8px;
  color: white;
  ${({ theme }) => theme.font.p.extra_small};
  text-align: center; /* Centraliza o texto horizontalmente */
  font-weight: 500;
`;
