import styled, { css } from "styled-components";
import { TicketModel } from "../../models/ticket";

interface ticketContainerProps {
  $status: TicketModel["status"];
}

export const TicketContainer = styled.section<ticketContainerProps>`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.brand.white};
  border-radius: 15px;
  padding: 10px;
  box-shadow: 0 4px 20px -3px rgba(0, 0, 0, 0.1);

  h4 {
    ${({ theme }) => theme.font.p.normal_bold};
    color: ${({ theme }) => theme.colors.grayscale.gray_90};
  }

  p {
    ${({ theme }) => theme.font.p.extra_small};
    color: ${({ theme }) => theme.colors.grayscale.gray_60};
    -webkit-line-clamp: 3; /* number of lines to show */
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

    .mockup-teste {
      min-width: 80px;
      ${({ theme }) => theme.font.p.extra_small};
      border-radius: 6px;
      text-align: center;
      padding: 3px 4px;

      ${({ $status }) => {
        if ($status === "Urgente") {
          return css`
            background-color: ${({ theme }) => theme.colors.support.error};
            color: ${({ theme }) => theme.colors.brand.white};
          `;
        }
        if ($status === "Andamento") {
          return css`
            background-color: ${({ theme }) => theme.colors.support.support_01};
            color: ${({ theme }) => theme.colors.brand.white};
          `;
        }
        if ($status === "Concluído") {
          return css`
            background-color: ${({ theme }) => theme.colors.support.success};
            color: ${({ theme }) => theme.colors.brand.white};
          `;
        }
      }}
    }
  }

  .description {
    margin-top: 1em;
  }
`;
