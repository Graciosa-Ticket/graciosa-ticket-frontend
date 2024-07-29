import styled, { css } from "styled-components";
import ButtonComponent from "../../../../components/buttons";
import { TicketModel } from "../../../../models/ticket";

export const UserTicketsViewContainer = styled.section`
  margin-top: 0.8em;

  .section-group-header {
    border-bottom: 1px solid ${({ theme }) => theme.colors.grayscale.gray_10};
    padding-bottom: 0.4em;
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
  ${({ theme }) => theme.font.h4};
  padding: 0.4em !important;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.brand.black};

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

  &:hover {
    background-color: ${({ theme }) =>
      theme.colors.ticket_status.open} !important;
  }
`;
const onGoingStyle = css`
  background-color: ${({ theme }) => theme.colors.ticket_status.on_going};

  &:hover {
    background-color: ${({ theme }) =>
      theme.colors.ticket_status.on_going} !important;
  }
`;
const reOpenStyle = css`
  background-color: ${({ theme }) => theme.colors.ticket_status.re_open};

  &:hover {
    background-color: ${({ theme }) =>
      theme.colors.ticket_status.re_open} !important;
  }
`;
const canceledStyle = css`
  background-color: ${({ theme }) => theme.colors.ticket_status.canceled};

  &:hover {
    background-color: ${({ theme }) =>
      theme.colors.ticket_status.canceled} !important;
  }
`;
const waitingApprovalStyle = css`
  background-color: ${({ theme }) =>
    theme.colors.ticket_status.waiting_approval};

  &:hover {
    background-color: ${({ theme }) =>
      theme.colors.ticket_status.waiting_approval};
  }
`;
const impedimentStyle = css`
  background-color: ${({ theme }) => theme.colors.ticket_status.impediment};

  &:hover {
    background-color: ${({ theme }) =>
      theme.colors.ticket_status.impediment} !important;
  }
`;
const doneStyle = css`
  background-color: ${({ theme }) => theme.colors.ticket_status.done};

  &:hover {
    background-color: ${({ theme }) =>
      theme.colors.ticket_status.done} !important;
  }
`;

const statusStyle = {
  ["Aberto"]: openStyle,
  ["Em_andamento"]: onGoingStyle,
  ["Aguardando aprovação"]: reOpenStyle,
  ["Cancelado"]: canceledStyle,
  ["Reaberto"]: waitingApprovalStyle,
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
    color: ${({ theme }) => theme.colors.grayscale.gray_80};
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
  }
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
