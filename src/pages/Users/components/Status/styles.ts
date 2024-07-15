import styled from "styled-components";

export const StatusLayout = styled.section`
  display: flex;
  align-items: center;
  gap: 6px;

  p {
    ${({ theme }) => theme.font.p.extra_small};
    line-height: 0em;
    color: ${({ theme }) => theme.colors.grayscale.gray_60};
  }

  .status-ball {
    width: 0.6em;
    height: 0.6em;
    border-radius: 50%;

    &.active {
      background-color: ${({ theme }) => theme.colors.support.success};
    }

    &.inactive {
      background-color: ${({ theme }) => theme.colors.support.error};
    }
  }
`;
