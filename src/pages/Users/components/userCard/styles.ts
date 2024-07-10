import styled from "styled-components";

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

  &:hover {
    transform: translateY(-3px);
  }

  .status-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
    margin-left: auto;

    p {
      ${({ theme }) => theme.font.p.small};
      color: ${({ theme }) => theme.colors.grayscale.gray_80};
    }

    .status-ball {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      &.active {
        background-color: ${({ theme }) => theme.colors.support.success};
      }
      &.inactive {
        background-color: ${({ theme }) => theme.colors.support.error};
      }
    }
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
      ${({ theme }) => theme.font.p.medium};
      font-weight: 500;
      color: ${({ theme }) => theme.colors.brand.dark_blue};
    }

    p {
      ${({ theme }) => theme.font.p.extra_small};
      color: ${({ theme }) => theme.colors.grayscale.gray_70};
    }
  }
`;
