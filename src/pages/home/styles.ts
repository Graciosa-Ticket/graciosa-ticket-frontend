import styled from "styled-components";

export const HomeSection = styled.section<{ isAdmin: boolean }>`
  display: grid;
  column-gap: 1em;
  row-gap: 3em;
  grid-template-columns: ${({ isAdmin }) => (isAdmin ? "1fr 2fr" : "1fr")};
`;
