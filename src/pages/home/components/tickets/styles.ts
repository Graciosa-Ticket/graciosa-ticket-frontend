import styled from "styled-components";

export const TicketsHomeContainer = styled.section`
  border-right: 1px solid ${({ theme }) => theme.colors.grayscale.gray_10};
  padding-right: 2em;

  .section-title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h3 {
      ${({ theme }) => theme.font.p.large_bold};
      color: ${({ theme }) => theme.colors.grayscale.gray_90};
    }

    a {
      display: flex;
      align-items: center;
      gap: 0.5em;
      ${({ theme }) => theme.font.p.small};
      color: ${({ theme }) => theme.colors.grayscale.gray_90};
      text-decoration: none;
    }
  }

  .ticket-list {
    max-height: 300px;
    margin-top: 1em;
    display: grid;
    padding: 10px;
    gap: 10px;
    overflow-y: auto;
  }
`;
