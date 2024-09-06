import styled, { css } from "styled-components";
import ButtonComponent from "../../../../components/buttons";
import { TicketModel } from "../../../../models/ticket";

export const AdminTicketViewContainer = styled.section`
  margin-top: 0.8em;
  display: grid;
  gap: 20px;

  .section-group-header {
    border-bottom: 1px solid ${({ theme }) => theme.colors.grayscale.gray_10};
    padding-bottom: 0.4em;
    margin-top: 20px;
  }

  .tickets-list {
    margin: 0.8em 0 0 2em;
    transition: 0.3s;
    overflow: hidden;
  }
`;

interface groupButtonProps {
  $open: boolean;
}

export const SectionGroupButton = styled(ButtonComponent)<groupButtonProps>`
  width: 100%;
  padding: 0.4em !important;
  justify-content: flex-start;

  span {
    max-width: 100%;
    ${({ theme }) => theme.font.h4};
    font-weight: 700;
    overflow: hidden;
    white-space: nowrap;
    text-align: left;
    color: ${({ theme }) => theme.colors.brand.dark_blue};
  }

  &::after {
    content: attr(data-total);
    ${({ theme }) => theme.font.p.extra_small};
  }

  svg {
    transition: 0.3s;
  }

  ${({ $open }) => {
    if ($open) {
      return css`
        svg {
          rotate: 90deg;
        }
      `;
    }
  }}
`;

const openStyle = css`
  background-color: ${({ theme }) => theme.colors.ticket_status.open};
  color: white;
  &:hover {
    background-color: ${({ theme }) =>
      theme.colors.ticket_status.open} !important;
  }
`;
const onGoingStyle = css`
  background-color: ${({ theme }) => theme.colors.ticket_status.on_going};
  color: white;
  &:hover {
    background-color: ${({ theme }) =>
      theme.colors.ticket_status.on_going} !important;
  }
`;
const reOpenStyle = css`
  background-color: ${({ theme }) => theme.colors.ticket_status.re_open};
  color: white;
  &:hover {
    background-color: ${({ theme }) =>
      theme.colors.ticket_status.re_open} !important;
  }
`;
const canceledStyle = css`
  background-color: ${({ theme }) => theme.colors.ticket_status.canceled};
  color: white;
  &:hover {
    background-color: ${({ theme }) =>
      theme.colors.ticket_status.canceled} !important;
  }
`;
const waitingApprovalStyle = css`
  background-color: ${({ theme }) =>
    theme.colors.ticket_status.waiting_approval};
  color: white;
  &:hover {
    background-color: ${({ theme }) =>
      theme.colors.ticket_status.waiting_approval};
  }
`;
const impedimentStyle = css`
  background-color: ${({ theme }) => theme.colors.ticket_status.impediment};
  color: white;
  &:hover {
    background-color: ${({ theme }) =>
      theme.colors.ticket_status.impediment} !important;
  }
`;
const doneStyle = css`
  background-color: ${({ theme }) => theme.colors.ticket_status.done};
  color: white;
  &:hover {
    background-color: ${({ theme }) =>
      theme.colors.ticket_status.done} !important;
  }
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

interface statusButtonProps extends Partial<groupButtonProps> {
  $status: TicketModel["status"];
}

export const StatusGroupButton = styled(ButtonComponent)<statusButtonProps>`
  ${({ theme }) => theme.font.p.extra_small};
  padding: 0.4em 0.9em !important;
  color: ${({ theme }) => theme.colors.brand.white};
  ${({ $status }) => statusStyle[$status]};
  position: relative;

  &::after {
    content: attr(data-total);
    ${({ theme }) => theme.font.p.small};
    color: ${({ theme }) => theme.colors.brand.dark_blue};
    position: absolute;
    right: -20px;
  }

  svg {
    transition: 0.3s;
  }

  ${({ $open }) => {
    if ($open) {
      return css`
        svg {
          rotate: 90deg;
        }
      `;
    }
  }}
`;

export const GroupedListContainer = styled.section`
  .ticket-table {
    margin-top: 0.8em;
    transition: 0.3s;
    overflow: hidden;
    cursor: pointer;
  }
`;

export const SectorListContainer = styled.div`
  border: solid 1px ${({ theme }) => theme.colors.grayscale.gray_20};
  padding: 0 10px 15px 10px;
  border-radius: 12px;
`;

export const StatusSpanTable = styled.div<statusButtonProps>`
  width: max-content;
  ${({ theme }) => theme.font.p.extra_small};
  line-height: 1em;
  padding: 0.4em 0.9em;
  color: ${({ theme }) => theme.colors.brand.white};
  ${({ $status }) => statusStyle[$status]};
  border-radius: 8px;
  position: relative;
`;
