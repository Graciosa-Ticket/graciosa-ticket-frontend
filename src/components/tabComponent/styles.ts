import styled from "styled-components";

export const TabContainer = styled.section`
  .tab-header {
    display: flex;
    flex-direction: row-reverse;
    gap: 20px;
  }

  .button {
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
  }
`;
