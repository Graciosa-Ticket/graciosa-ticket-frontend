import styled from "styled-components";
import ButtonComponent from "../buttons";

export const PagesHeaderContainer = styled.section`
  display: flex;
  align-items: center;
  gap: 1em;
`;
export const PagesHeaderTitle = styled.h1`
  ${({ theme }) => theme.font.h3};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.brand.dark_blue};
`;

export const PagesHeaderButtonContainer = styled(ButtonComponent)`
  color: ${({ theme }) => theme.colors.brand.dark_blue};
  border-radius: 99px;
  padding: 0.5em;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ theme }) => theme.colors.support.success};
  }
`;
