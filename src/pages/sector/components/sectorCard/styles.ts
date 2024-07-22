import styled, { css } from "styled-components";
import { TicketModel } from "../../../../models/ticket";

export const SectorComponent = styled.button`
  width: 100%;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  padding: 15px;
  background-color: ${({ theme }) => theme.colors.brand.white};
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
  .status-container {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }

  .header-sector {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .user-container {
      display: flex;
      align-items: center;
      gap: 6px;

      span {
        max-width: 70px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        ${({ theme }) => theme.font.p.extra_small};
        color: ${({ theme }) => theme.colors.grayscale.gray_60};
      }
    }

    h3 {
      ${({ theme }) => theme.font.p.medium_bold};
      color: ${({ theme }) => theme.colors.grayscale.gray_80};
    }
  }

  .p-sector {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 25px;
    margin-top: 10px;

    p {
      text-align: left;
      ${({ theme }) => theme.font.p.extra_small};
      color: ${({ theme }) => theme.colors.grayscale.gray_80};
    }
  }

  .description-section {
    width: 100%;
    margin-top: 1em;
    h6 {
      text-align: left;
      ${({ theme }) => theme.font.p.extra_small_bold};
      color: ${({ theme }) => theme.colors.grayscale.gray_80};
    }
    p {
      text-align: left;
      ${({ theme }) => theme.font.p.extra_small};
      color: ${({ theme }) => theme.colors.grayscale.gray_80};
    }
  }
`;

interface StatusPProps {
  status: TicketModel["status"];
}

const openStyle = css`
  background-color: ${({ theme }) => theme.colors.ticket_status.open};
  color: ${({ theme }) => theme.colors.brand.white};
`;

const onGoingStyle = css`
  background-color: ${({ theme }) => theme.colors.ticket_status.on_going};
  color: ${({ theme }) => theme.colors.brand.white};
`;

const reOpenStyle = css`
  background-color: ${({ theme }) => theme.colors.ticket_status.re_open};
  color: ${({ theme }) => theme.colors.brand.white};
`;

const canceledStyle = css`
  background-color: ${({ theme }) => theme.colors.ticket_status.canceled};
  color: ${({ theme }) => theme.colors.brand.white};
`;

const waitingApprovalStyle = css`
  background-color: ${({ theme }) => theme.colors.ticket_status.waiting_approval};
  color: ${({ theme }) => theme.colors.brand.white};
`;

const impedimentStyle = css`
  background-color: ${({ theme }) => theme.colors.ticket_status.impediment};
  color: ${({ theme }) => theme.colors.brand.white};
`;

const doneStyle = css`
  background-color: ${({ theme }) => theme.colors.ticket_status.done};
  color: ${({ theme }) => theme.colors.brand.white};
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
`;
