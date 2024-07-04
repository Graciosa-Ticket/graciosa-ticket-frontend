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

  p {
    font-size: 10px;
    color: #858585;
    text-align: center;
  }
  
  h3 {
    font-size: 10px;
    color: #858585;
    margin-right: 5px;
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

  .h3-container {
    display: flex;
    align-items: center;
    position: absolute;
    top: 15px;
    right: 15px;
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
