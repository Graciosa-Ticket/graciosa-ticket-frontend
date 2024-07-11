import styled from "styled-components";

export const ActionModalContainer = styled.section`
  padding: 0.9em 1em;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: flex-end;

.content-container{  
  p {
    max-width: 250px;
    ${({ theme }) => theme.font.p.normal};
    color: ${({ theme }) => theme.colors.grayscale.gray_80};
    text-align: center;
  } 
}

.buttons-container{
  display:flex;
  align-items:center;
  justify-content:flex-end;
  gap:1em;
}
`;
