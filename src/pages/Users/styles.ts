import styled from "styled-components";

export const UserContainer = styled.section`
  .search-user {
    margin-left: 20 px;
  }
  .select-buttons-area {
    margin-top: 2em;
    display: flex;
    gap: 20px;
    width: 100%;
  }

  .user-cards {
    margin-top: 2em;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(147px, 1fr));
    gap: 20px;
  }

  .select-button {
    font-weight: 700;
    width: 15%;
    justify-content: center;
    ${({ theme }) => theme.font.p.extra_small_bold};
  }
`;
