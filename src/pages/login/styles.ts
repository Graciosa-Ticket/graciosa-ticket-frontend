import styled from "styled-components";

export const LoginContainer = styled.section`
  width: 100%;
  padding: 50px;
  align-items: center;
  justify-content: center;
  display: flex;
  gap: 200px;

  .login-left {
    width: 100%;
    max-width: 612px;
    height: 100%;
    background-image: linear-gradient(#0054a4, #280741);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 50px;

    h1 {
      ${({ theme }) => theme.font.h1};
      color: ${({ theme }) => theme.colors.brand.white};
      font-weight: 900;
    }

    p {
      color: ${({ theme }) => theme.colors.brand.white};
      ${({ theme }) => theme.font.p.small};
    }
  }

  .login-right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;

    img {
      width: 74px;
    }

    h1 {
      ${({ theme }) => theme.font.h2};
      color: ${({ theme }) => theme.colors.brand.black};
      font-weight: 900;
    }

    p {
      color: ${({ theme }) => theme.colors.brand.black};
      ${({ theme }) => theme.font.p.small};
    }
  }

  .top-right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .div-login-ib {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    a {
      color: ${({ theme }) => theme.colors.brand.black};
      ${({ theme }) => theme.font.p.small};
      margin-top: 1em;
    }
  }
`;
