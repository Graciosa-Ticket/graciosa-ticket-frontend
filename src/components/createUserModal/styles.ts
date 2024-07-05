import styled from "styled-components";

export const UserComponent = styled.section`

  width: 100%;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  padding: 15px;
  gap: 10px;
  background-color: white;
  transition: transform 0.2s ease-in-out;
  position: relative;

  h1 {
    ${({theme}) => theme.font.h3};
    color: ${({theme}) => theme.colors.brand.blue};
    text-align: start;
  }

  .header-sector {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .user-avatar {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
  }


  .user-info-area {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 2em;
    column-gap: 20px;
  }

  .img-sector{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 18px;
  }

  .form{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 2em;
    column-gap: 30px;
    
  }
  
  .button-div{
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
`;
