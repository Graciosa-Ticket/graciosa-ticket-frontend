import styled, { keyframes } from "styled-components";

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(500px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

export const UserComponent = styled.section`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  padding: 0 15px 15px;
  gap: 10px;
  background-color: ${({ theme }) => theme.colors.brand.white};
  transition: transform 0.2s ease-in-out;
  position: relative;
  animation: 0.3s ${fadeInLeft} linear;

  .img-sector {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .user-info-title {
    ${({ theme }) => theme.font.p.small};
    color: ${({ theme }) => theme.colors.brand.dark_blue};
  }

  .user-info-area {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 2em;
    column-gap: 3em;
  }

  .function-area {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .left-side {
    flex: 1;
    padding: 10px;

    span {
      ${({ theme }) => theme.font.p.extra_small};
      color: ${({ theme }) => theme.colors.grayscale.gray_80};
    }

    h5 {
      ${({ theme }) => theme.font.p.small};
      font-weight: 500;
      color: ${({ theme }) => theme.colors.brand.dark_blue};
    }
  }

  .right-side {
    flex: 1;
    padding: 10px;
  }

  .user-avatar {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
  }

  .footer {
    display: grid;
    grid-template-columns: 100px 1fr 1fr;
    justify-content: flex-end;
    margin-top: auto;
    gap: 20px;
  }
`;
