import styled from "styled-components";

export const DisplayComponent = styled.section`
  width: 100%;
  border-radius: 10px;
  border: 1px solid slategray;
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
  }

  .suffix {
    font-size: 1em;
    color: #858585;
    margin-right: 5px;
    left:0;
  }
`;
