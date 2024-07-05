import styled from "styled-components";

export const IconComponent = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    row-gap: 2em;
    column-gap: 20px;


  .print-sector {
    color: #858585;
    margin-bottom: 5px; 
  }

  .text-sector {
    font-size: 2em;
    color: #0054a4;
    margin-right: 5px;
  }

  .icon-sector {
    display: flex;
    justify-content: center;
    align-items: center;   
    color: #0054a4; 
  }

  h2{
    size: 1em;
  }

`;
