import styled from "styled-components";

export const NotFoundContainer = styled.section`
  padding: 3em 4em;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    text-align: center;
    ${({ theme }) => theme.font.p.normal};
    color: ${({ theme }) => theme.colors.grayscale.gray_80};
  }
`;
