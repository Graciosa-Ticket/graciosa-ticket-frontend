import styled from "styled-components";

export const UserContainer = styled.section`
  .user-header {
    margin: 10px 0 20px;
    display: flex;
    align-items: center;
    gap: 1em;

    h1 {
      ${({ theme }) => theme.font.h1};
      font-weight: 700;
    }
  }

  .btn:hover {
    color:green;
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
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

  .select-button{
    font-weight: 700;
    width: 15%;
    justify-content: center;
    ${({ theme }) => theme.font.p.extra_small_bold};
    
  }
`;
