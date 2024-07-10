import styled, { css } from "styled-components";
import { UserModel } from "../../models/user";

interface homeSectionProps {
  $view: UserModel["type"];
}

export const HomeSection = styled.section<homeSectionProps>`
  display: grid;
  column-gap: 1em;
  row-gap: 3em;

  ${({ $view }) => {
    if ($view === "admin") {
      return css`
        grid-template-columns: 1fr 2fr;
      `;
    }
  }}
`;
