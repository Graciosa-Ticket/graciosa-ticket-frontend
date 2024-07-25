import styled from "styled-components";

export const LoginContainer = styled.section`
  width: 100%;
  padding: 20px;
  align-items: center;
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 60px;

  .left-container {
    width: 100%;
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

  .right-container {
    display: flex;
    align-items: center;
    justify-content: center;

    .content {
    }

    .logo-container {
      display: grid;
      justify-items: center;

      img {
        width: 80px;
        text-align: center;
        mix-blend-mode: multiply;
      }

      h1 {
        ${({ theme }) => theme.font.h2};
        color: ${({ theme }) => theme.colors.brand.black};
        font-weight: 900;
      }

      p {
        color: ${({ theme }) => theme.colors.grayscale.gray_50};
        ${({ theme }) => theme.font.p.small};
        margin-top: 0.5em;
      }
    }
  }

  form {
    display: grid;
    gap: 10px;
    margin-top: 2em;

    .buttons-container {
      display: grid;

      button {
        padding: 0.6em 2em;
        ${({ theme }) => theme.font.p.normal};
        &:hover {
          scale: 1.01;
        }
      }
    }
  }
`;
