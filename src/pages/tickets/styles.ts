import styled from "styled-components";

export const TicketsPageContainer = styled.section`
  margin-bottom: 100px;

  .select-buttons-area {
    margin-top: 2em;
    display: flex;
    gap: 20px;
    width: 100%;
  }

  .select-button {
    font-weight: 700;
    width: 15%;
    justify-content: center;
    ${({ theme }) => theme.font.p.extra_small_bold};
  }
`;
