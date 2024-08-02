import styled from "styled-components";

export const FaqModalComponent = styled.section`
  gap: 20px;
  padding: 20px;

  h2 {
    color: ${({ theme }) => theme.colors.brand.black};
    font-size: 1.25em; /* Ajuste o tamanho da fonte conforme necessário */
    margin-top: 20px;
    font-weight: 800;
  }

  p {
    max-width: 450px;
    display: block;
    ${({ theme }) => theme.font.p.small};
    color: ${({ theme }) => theme.colors.grayscale.gray_80};
    padding: 10px;
    font-weight: 500;
  }
`;
