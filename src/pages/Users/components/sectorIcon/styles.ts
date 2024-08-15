import styled from "styled-components";

export const IconComponent = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;

  p {
    ${({ theme }) => theme.font.p.extra_small};
    color: ${({ theme }) => theme.colors.grayscale.gray_80};
    text-align: start;
  }

  h2 {
    ${({ theme }) => theme.font.p.extra_small};
    font-weight: 500;
    color: ${({ theme }) => theme.colors.brand.dark_blue};
    margin-top: 2px;
  }

  .prints {
    display: grid;
  }

  .icon {
    color: ${({ theme }) => theme.colors.brand.blue};
    font-size: 1.6em;
  }
`;
