import styled from "styled-components";

export const TicketFileContainer = styled.div`
  margin-top: 10px;

  ul {
    display: grid;
    gap: 2px;

    li {
      display: flex;
      gap: 4px;
      align-items: center;

      ${({ theme }) => theme.font.p.extra_small};
      color: ${({ theme }) => theme.colors.brand.dark_blue};

      span {
        max-width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        ${({ theme }) => theme.font.p.extra_small};
        color: inherit;
      }
    }
  }
`;
