import styled from "styled-components";

export const MenuHeaderHome = styled.header`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  gap: 1em;

  .menu {
    width: 100%;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
  }

  ul {
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 1em;
    list-style: none;
    border-radius: 15px;
    background-color: ${({ theme }) => theme.colors.brand.white};
    box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.08);
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.brand.black};
    padding: 10px;
    border-radius: 8px;
    transition: 0.3s;

    &.active-button {
      background-color: ${({ theme }) => theme.colors.brand.blue};

      color: ${({ theme }) => theme.colors.brand.white};
    }
  }

  .menu-right-img {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    font-size: 14px;
    color: #535353;
  }
`;
