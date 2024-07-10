import styled from "styled-components";

export const IconComponent = styled.section`
    width: 100%;
    display: flex;
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
    color: ${({ theme }) => theme.colors.brand.blue};
    margin-top: 20px; 
  }

  h2{
    ${({theme}) => theme.font.p.small}
  }
  
  p{
    color: ${({theme}) => theme.colors.brand.blue};
  }
  
  .icon-size{}

`;
