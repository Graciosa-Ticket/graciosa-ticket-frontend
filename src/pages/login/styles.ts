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
    position: relative;
    overflow: hidden;

    .gcc-entry {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      object-fit: cover;
      z-index: 0;
    }

    h1 {
      margin-top: 80px;
      ${({ theme }) => theme.font.h3};
      color: white;
      font-weight: 700;
      position: relative;
      max-width: 85%;
      z-index: 1;
      margin-left: 25px;
    }

    p {
      color: white;
      ${({ theme }) => theme.font.p.extra_small};
      position: relative;
      max-width: 70%;
      z-index: 1;
      margin-left: 25px;
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
      }

      h1 {
        margin-top: 20px;
        ${({ theme }) => theme.font.h3};
        color: ${({ theme }) => theme.colors.brand.dark_blue};
        font-weight: 800;
      }

      p {
        color: ${({ theme }) => theme.colors.brand.dark_blue};
        ${({ theme }) => theme.font.p.small};
        margin-top: 0.5em;
      }
    }

    &::placeholder {
      color: ${({ theme }) => theme.colors.brand.dark_blue};
    }
  }

  form {
    display: grid;
    gap: 10px;
    margin-top: 2em;

    .buttons-container {
      display: grid;
      margin-top: 20px;

      button {
        padding: 0.6em 2em;
        ${({ theme }) => theme.font.p.normal};
        &:hover {
          scale: 1.01;
        }
      }
    }
  }

  .reset-Password-container {
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.colors.brand.dark_blue};
    ${({ theme }) => theme.font.p.normal};
    cursor: pointer;
    margin-top: 20px;
  }
`;
