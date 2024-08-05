import styled from "styled-components";

export const HomeSection = styled.section<{ isadmin: boolean }>`
  display: grid;
  column-gap: 1em;
  row-gap: 3em;
  grid-template-columns: ${({ isadmin }) => (isadmin ? "1fr 2fr" : "1fr")};
`;
