import styled from "styled-components";

export const UserComponent = styled.section`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  padding: 15px;
  gap: 10px;
  background-color: white;
  transition: transform 0.2s ease-in-out;
  position: relative;
  
  h3{
    ${({theme}) => theme.font.h3};
    color: ${({theme}) => theme.colors.brand.dark_blue};
  }

  .img-sector{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .user-info-area {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 2em;
    column-gap: 20px;
  }

  .function-area{
    width: 100%;
    display: flex;
  }

  .left-side {
    flex: 1;
    padding: 10px;
    gap: 20px;
  }
  
  .right-side {
    flex: 1;
    padding: 10px;
  }

  .user-avatar {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
  }

  .footer{
    display: flex;
    justify-content: flex-end;
    margin-top: auto;
    gap: 20px;
  }

  .btn{
    font-size: 24px;
    padding: 12px 24px;
  }
`;

export const Userheader = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  .status-ball {
    width: 1em;
    height: 1em;
    border-radius: 50%;

    &.active{
      background-color: ${({theme}) => theme.colors.support.success};
    }
    &.inactive {
      background-color: ${({theme}) => theme.colors.support.error};
    }
  }

`;
