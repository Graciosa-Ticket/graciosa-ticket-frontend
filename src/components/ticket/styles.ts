import styled, { css, keyframes } from "styled-components";
import { TicketModel } from "../../models/ticket";

const entranceAnimation = keyframes`
  from {
    transform: rotateX(180);
    opacity: 0;
  }
  to {
    transform: rotateX(0);
    opacity: 1;
  }
`;

interface ticketContainerProps {
  $status: TicketModel["status"];
}

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

export const TicketContainer = styled.button<ticketContainerProps>`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.brand.white};
  border-radius: 15px;
  padding: 10px;
  box-shadow: 0 4px 20px -3px rgba(0, 0, 0, 0.1);
  transition: 0.2s ease-in-out;
  align-items: center;
  animation: 0.5s ${entranceAnimation} ease;
  transform-origin: left;
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
  }

  h4 {
    ${({ theme }) => theme.font.p.normal_bold};
    color: ${({ theme }) => theme.colors.brand.dark_blue};
    max-width: 150px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  p {
    ${({ theme }) => theme.font.p.extra_small};
    color: ${({ theme }) => theme.colors.grayscale.gray_60};
    -webkit-line-clamp: 3;
    line-clamp: 3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .top-ticketCard {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;

    .left-side {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .mockup {
      min-width: 80px;
      ${({ theme }) => theme.font.p.extra_small};
      border-radius: 6px;
      text-align: center;
      padding: 3px 4px;
      ${({ $status }) => statusStyle[$status]};
    }
  }

  .description {
    margin-top: 8px;
    text-align: left;
    ${({ theme }) => theme.font.p.small};
    color: ${({ theme }) => theme.colors.grayscale.gray_60};
  }
`;
