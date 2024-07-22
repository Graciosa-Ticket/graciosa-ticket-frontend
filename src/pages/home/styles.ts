import styled, { css } from "styled-components";
import { UserModel } from "../../models/user";

interface homeSectionProps {
  $view: UserModel["role"];
}

export const HomeSection = styled.section<homeSectionProps>`
  display: grid;
  column-gap: 1em;
  row-gap: 3em;

  ${({ $view }) => {
    if ($view === "Administrator") {
      return css`
        grid-template-columns: 1fr 2fr;
      `;
    }
  }}
`;
