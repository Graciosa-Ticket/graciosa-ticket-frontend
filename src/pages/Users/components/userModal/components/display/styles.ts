import styled from "styled-components";

export const DisplayComponent = styled.section`
width: 80%;
border-bottom: 0.5px solid ${({theme}) => theme.colors.grayscale.gray_70};
color: white; 
padding: 10px; 
display: flex;
flex-direction: column;

  .label {
    color: ${({theme}) => theme.colors.grayscale.gray_60};
    margin-bottom: 5px; 
  }


  .suffix {
    ${({theme}) => theme.font.p.extra_small};
    color: ${({theme}) => theme.colors.grayscale.gray_60};
    margin-top: 5px;
    text-align: right;
  }

  .number{
    ${({theme}) => theme.font.p.large};
    color: ${({theme}) => theme.colors.brand.dark_blue}; 
  }
  
  .text{
    ${({theme}) => theme.font.p.large};
    color: ${({theme}) => theme.colors.brand.dark_blue}; 
    max-width: 350px;
    overflow: hidden;
    text-overflow: ellips; 
  }
`;
