import styled, { keyframes } from "styled-components";

interface searchProps {
  $loading: boolean;
}

const loadingAnimation = keyframes`

0%{
rotate: 0deg;

}

100%{
rotate: 360deg;

}


`;

export const SearchBarContainer = styled.div<searchProps>`
  padding: ${({ $loading }) => ($loading ? "0 10px" : "0 0px 0px 10px")};
  display: flex;
  align-items: center;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.brand.white};
  border: solid 1px ${({ theme }) => theme.colors.grayscale.gray_10};
  position: relative;
  transition: 300ms;

  input {
    padding: 10px 12px;
    ${({ theme }) => theme.font.p.normal};
    color: ${({ theme }) => theme.colors.grayscale.gray_80};
    outline: none;
  }

  .search-icon {
    color: ${({ theme }) => theme.colors.grayscale.gray_50};
  }

  .loading-icon {
    animation: 800ms ${loadingAnimation} infinite linear;
  }
`;
