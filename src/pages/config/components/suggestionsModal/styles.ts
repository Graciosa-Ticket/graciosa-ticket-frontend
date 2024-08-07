import styled from "styled-components";

export const SuggestionsModalComponent = styled.section`
  gap: 20px;
  padding: 20px;

  p {
    max-width: 400px;
    ${({ theme }) => theme.font.p.normal};
    color: ${({ theme }) => theme.colors.grayscale.gray_80};
    padding: 10px;
    font-weight: 500;
  }
`;
