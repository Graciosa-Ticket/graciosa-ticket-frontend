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

  &:hover {
    transform: translateY(-5px);
  }

  p {
    font-size: 10px;
    color: #858585;
    text-align: center;
  }

  h2 {
    font-size: 15px;
    text-align: center;
    color: #0054a4;
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

  .sector-container {
    display: flex;
    align-items: center;
  }

  .p-sector {
  display: flex;
  align-items: center;
  gap: 10px; 
  margin-left: 20px; 
}



  .sector-icon {
    font-size: 24px;
    color: #0054a4; 
  }

  .sector-text {
    font-size: 30px; 
    text-align: start;
    color: #003366;
  }
`;
