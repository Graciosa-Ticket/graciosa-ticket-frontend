import styled, { keyframes } from "styled-components";

const entranceAnimation = keyframes`

from{
  transform: rotateX(180);
  opacity: 0;
}

to{
  transform: rotateX(0);
  opacity: 1;
}
`;

export const UserComponent = styled.button`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  padding: 12px;
  gap: 10px;
  background-color: ${({ theme }) => theme.colors.brand.white};
  transition: 0.2s ease-in-out;
  align-items: center;
  animation: 0.5s ${entranceAnimation} ease;
  transform-origin: left;
  box-shadow: 0 4px 20px -3px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-3px);
  }

  .status-container {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .header-container {
    .user-avatar {
      width: 66px;
      height: 66px;
      object-fit: cover;
      border-radius: 50%;
    }
  }

  .userdata-container {
    h5 {
      ${({ theme }) => theme.font.p.normal};
      font-weight: 500;
      color: ${({ theme }) => theme.colors.brand.dark_blue};
    }

    p {
      ${({ theme }) => theme.font.p.extra_small};
      color: ${({ theme }) => theme.colors.grayscale.gray_70};
    }
  }

  span {
    ${({ theme }) => theme.font.p.extra_small};

    color: ${({ theme }) => theme.colors.grayscale.gray_60};
  }
`;
