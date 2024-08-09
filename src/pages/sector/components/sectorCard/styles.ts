import styled from "styled-components";

export const SectorComponent = styled.button`
  width: 100%;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  padding: 15px;
  background-color: ${({ theme }) => theme.colors.brand.white};
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 4px 20px -3px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
  }

  .status-container {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }

  .header-sector {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .user-container {
      display: flex;
      align-items: center;
      gap: 6px;

      span {
        max-width: 70px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        ${({ theme }) => theme.font.p.extra_small};
        color: ${({ theme }) => theme.colors.grayscale.gray_60};
      }
    }

    h3 {
      ${({ theme }) => theme.font.p.medium_bold};
      color: ${({ theme }) => theme.colors.brand.dark_blue};
      max-width: 150px;
      white-space: nowrap;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .p-sector {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 25px;
    gap: 4px;
    text-align: left;
    margin-top: 14px;

    p {
      ${({ theme }) => theme.font.p.extra_small};
      color: ${({ theme }) => theme.colors.grayscale.gray_40};
    }
    span {
      ${({ theme }) => theme.font.p.extra_small};
      text-align: center;
      color: ${({ theme }) => theme.colors.grayscale.gray_40};
    }
  }

  .description-section {
    width: 100%;
    margin-top: 1em;
    h6 {
      text-align: left;
      ${({ theme }) => theme.font.p.extra_small_bold};
      color: ${({ theme }) => theme.colors.brand.black};
    }
    p {
      max-width: 95%;
      text-align: left;
      ${({ theme }) => theme.font.p.extra_small};
      color: ${({ theme }) => theme.colors.grayscale.gray_40};
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
`;
