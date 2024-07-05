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
    color: ${({theme}) => theme.colors.grayscale.gray_60};
    margin-bottom: 5px; 
  }

  .content {
    ${({theme}) => theme.font.h3};
    color: ${({theme}) => theme.colors.brand.blue};
  }

  .suffix {
    ${({theme}) => theme.font.p.extra_small};
    color: ${({theme}) => theme.colors.grayscale.gray_60};
    margin-top: 5px;
    align-items: end;
}

`;
