import styled from "styled-components";

export const StatusLayout = styled.section`
  display: flex;
  grid-template-columns: auto 1fr;
  gap: 10px;
  justify-self: center; 
  align-items: center;

  .status-ball {
    width: 1em;
    height: 1em;
    border-radius: 50%;

    &.active {
      background-color: ${({ theme }) => theme.colors.support.success};
    }

    &.inactive {
      background-color: ${({ theme }) => theme.colors.support.error};
    }
  }
`;
