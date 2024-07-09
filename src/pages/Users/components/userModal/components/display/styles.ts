import styled from "styled-components";

export const DisplayComponent = styled.section`
width: 80%;
border-bottom: 0.5px solid ${({theme}) => theme.colors.grayscale.gray_80};
color: white; 
padding: 10px; 
display: flex;
flex-direction: column;

  .label {
    color: ${({theme}) => theme.colors.grayscale.gray_80};
    font-weight: 700;
    margin-bottom: 5px; 
  }


  .suffix {
    ${({theme}) => theme.font.p.extra_small_bold};
    color: ${({theme}) => theme.colors.grayscale.gray_80};
    margin-top: 5px;
    text-align: right;
  }

  .number{
    ${({theme}) => theme.font.p.large};
    color: ${({theme}) => theme.colors.brand.dark_blue}; 
    font-weight: 600;
  }
  
  .text{
    ${({theme}) => theme.font.p.large};
    color: ${({theme}) => theme.colors.brand.dark_blue}; 
    font-weight: 600;
    max-width: 350px;
    overflow: hidden;
    text-overflow: ellips; 
  }
`;
