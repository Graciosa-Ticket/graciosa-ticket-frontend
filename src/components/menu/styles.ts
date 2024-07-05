import styled from "styled-components";
import ButtonComponent from "../buttons";

export const MenuHeaderHome = styled.header`
  max-width: 1200px;
  margin: 20px auto 0;
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  align-items: center;
  gap: 1em;

  .left-side {
    display: flex;
    align-items: center;
    img {
      max-width: 36px;
      mix-blend-mode: multiply;
    }
  }

  .menu {
    display: flex;
    gap: 1em;
    align-items: center;
    justify-content: center;

    .navigation-menu {
      display: flex;
      align-items: center;
      gap: 1em;
      list-style: none;
      padding: 4px;
      border-radius: 12px;
      background-color: ${({ theme }) => theme.colors.brand.white};
      box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.08);
    }

    a {
      text-decoration: none;
      color: ${({ theme }) => theme.colors.brand.black};
      ${({ theme }) => theme.font.p.small};
      padding: 10px;
      border-radius: 8px;
      transition: 0.3s;

      &:hover {
        background-color: ${({ theme }) => theme.colors.grayscale.gray_10};
      }

      &.active-button {
        background-color: ${({ theme }) => theme.colors.brand.blue};
        color: ${({ theme }) => theme.colors.brand.white};
      }
    }
  }
  .menu-right-img {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1em;
  }
`;

export const UserCallerContainer = styled(ButtonComponent)`
  padding: 0.3em;
  display: flex;
  align-items: center;
  gap: 1em;

  span {
    ${({ theme }) => theme.font.p.small};
  }

  img {
    width: 2em;
  }
`;
