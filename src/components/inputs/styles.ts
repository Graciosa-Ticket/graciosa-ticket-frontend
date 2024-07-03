import styled from "styled-components";

export const InputLogin = styled.section`
  input {
    background-color: transparent;
    border: 1px solid #9f9f9f;
    border-radius: 8px;
    width: 290px;
    height: 40px;
    padding: 0 15px;
  }

  .input-login {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding-bottom: 10px;

    p {
      width: auto;
      margin: 0;
      font-size: 12px;
    }
  }

  .eye-svg.eye-svg {
    width: 20px;
    cursor: pointer;
    position: absolute;
    margin-left: 240px;
  }

  .pass-div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
`;
