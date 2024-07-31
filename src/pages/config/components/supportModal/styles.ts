import styled from "styled-components";

export const SupportModalComponent = styled.section`
  gap: 20px;
  padding: 20px;

  span {
    ${({ theme }) => theme.font.p.large};
    color: ${({ theme }) => theme.colors.grayscale.gray_80};
  }
`;
