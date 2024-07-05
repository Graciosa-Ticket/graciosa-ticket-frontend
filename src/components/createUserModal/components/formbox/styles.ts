import styled from "styled-components";

export const DisplayComponent = styled.form`
  width: 100%;
  color: white; 
  padding: 10px; 
  font-size: 15px;
  display: flex;
  flex-direction: column;

  .label {
    color: #858585;
    margin-bottom: 5px; 
  }

  .content {
    font-size: 2em;
    color: #0054a4;
    margin-right: 5px;
    padding: 5px;
  }

  .suffix {
    font-size: 1em;
    color: #858585;
    margin-right: 5px;
    align-self: flex-end;
    cursor: pointer;
  }
`;
