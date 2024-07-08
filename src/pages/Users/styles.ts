import styled from "styled-components";

export const UserContainer = styled.section`
  .user-header {
    margin: 10px 0 20px;
    display: flex;
    align-items: center;
    gap: 1em;

    h1 {
      ${({ theme }) => theme.font.h1};
    }
  }

  .btn:hover {
    color:green;
}

  .sector-selector {
    margin-bottom: 20px; 
    display: flex;
    gap: 20px; 
  }

  .user-cards {
    margin-top: 2em;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

  .seletor{
    font-weight: 700;
    width: 15%;
    justify-content: center;
    ${({ theme }) => theme.font.p.extra_small_bold};
    
  }
`;
