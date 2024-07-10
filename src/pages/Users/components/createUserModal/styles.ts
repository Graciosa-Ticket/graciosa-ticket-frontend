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

  h1 {
    ${({ theme }) => theme.font.h3};
    color: ${({ theme }) => theme.colors.brand.dark_blue};
    text-align: start;
  }

  .user-avatar {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
  }

  .img-sector {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 18px;
  }
  .user-info-title {
    ${({ theme }) => theme.font.p.small};
    color: ${({ theme }) => theme.colors.brand.dark_blue};
  }

  .form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 2em;
    column-gap: 30px;
  }

  .button-div {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: flex-end;
    margin-top: auto;
  }
`;
