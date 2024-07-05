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
    font-size: 1.5em;
    color: #0054a4;
    text-align: start;
  }

  .user-header {
    font: ${({ theme }) => theme.font.h1.large};
    text-align: start;
    display: flex;
    flex-direction: row;
    gap: 20px;
  }

  p {
    font-size: 10px;
    color: #858585;
    text-align: center;
  }

  h3 {
    font-size: .5em;
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
    top: 15px;
    right: 15px;
  }

  .status-ball {
    width: 0.5em;
    height: 0.5em;
    border-radius: 50%;
  }

  .status-ball.active {
    background-color: green;
  }

  .status-ball.inactive {
    background-color: red;
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

  .function-area{
    width: 100%;
    display: flex;
    flex-direction: row;
  }

  .foooter-buttons{
    position: absolute;
  bottom: 0;
  }
`;
