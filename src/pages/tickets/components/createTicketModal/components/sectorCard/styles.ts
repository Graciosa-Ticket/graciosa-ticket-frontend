import styled, { keyframes } from "styled-components";

const grow = keyframes`

from{
  opacity: 0;
  transform: scale(0.6);
}

to{
  opacity: 1;
  transform: scale(1);
}

`;

export const SectorComponent = styled.button`
  width: 100%;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  padding: 15px;
  background-color: ${({ theme }) => theme.colors.brand.white};
  box-shadow: 0 2px 10px -2px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: 0.3s;
  animation: 0.2s ${grow} ease;
  min-height: 150px;
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
    display: grid;
    align-items: center;
    justify-content: space-between;
    gap: 4px;

    .user-container {
      display: flex;
      align-items: center;
      gap: 6px;

      span {
        max-width: 125px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        ${({ theme }) => theme.font.p.extra_small};
        color: ${({ theme }) => theme.colors.grayscale.gray_60};
      }
    }

    h3 {
      text-align: left;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 150px;
      ${({ theme }) => theme.font.p.normal_bold};
      color: ${({ theme }) => theme.colors.brand.dark_blue};
      margin-bottom: 8px;
    }
  }

  .description-section {
    width: 100%;
    margin-top: 1em;

    h6 {
      text-align: left;
      ${({ theme }) => theme.font.p.extra_small_bold};
      color: ${({ theme }) => theme.colors.brand.dark_blue};
    }

    p {
      text-align: left;
      ${({ theme }) => theme.font.p.extra_small};
      color: ${({ theme }) => theme.colors.grayscale.gray_80};
      max-width: 250px;
      overflow-wrap: break-word;
    }
  }
`;
