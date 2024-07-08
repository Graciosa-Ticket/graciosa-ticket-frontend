import styled from "styled-components";


export const IconComponent = styled.section`
 width: 100%;
 display: flex;
 align-items: center;


 p{
    ${({ theme }) => theme.font.p.small};
    color: ${({ theme }) => theme.colors.grayscale.gray_50};
    text-align: start;
  }  
  
  h2 {
    ${({ theme }) => theme.font.p.large};
    color: ${({ theme }) => theme.colors.brand.dark_blue};
    font-weight: 700;
  }  

  .prints{
   display: grid;
   padding: 20px;
  }

  .icon{
    color: ${({theme}) => theme.colors.brand.blue};
  }
  `;
