import styled from "styled-components";

export const UserComponent = styled.button`
  width: 100%;
  height: 100%;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  padding: 15px;
  gap: 10px;
  row-gap: 2em;
  background-color: white;
  transition: transform 0.2s ease-in-out;
  align-items: center;
  max-width: 500px;
  overflow: hidden;
  

  &:hover {
    transform: translateY(-5px);
  }

  p {
    ${({theme}) => theme.font.p.extra_small};
    color: ${({theme}) => theme.colors.grayscale.gray_60}; 
  }

  h2 {
    ${({theme}) => theme.font.h3};
    color: ${({theme}) => theme.colors.brand.dark_blue};
  }

  .user-avatar {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
  }

  .status-container {
  display: flex;
  justify-content: flex-end; 
  gap: 20px; 
  margin-left: auto;
}
  .status-ball {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }

  .status-ball.active {
    background-color: green;
  }

  .status-ball.inactive {
    background-color: red;
  }
`;
