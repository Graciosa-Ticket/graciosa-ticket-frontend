import styled from "styled-components";

export const TabContainer = styled.section`
  .tab-header {
    display: flex;
    justify-content: flex-end;
    gap: 20px;
    margin-bottom: 10px;
  }

  .tab-button {
    border-radius: 0;
    display: flex;
    flex-direction: column;
    padding: 8px 12px;
    cursor: pointer;
    transition: 0.3s;
    box-shadow: 0 4px 20px -3px rgba(0, 0, 0, 0.1);

    &.active-tab {
      border-bottom: 4px solid ${({ theme }) => theme.colors.brand.blue};
    }
  }

  .tab-content {
    width: 100%;
    overflow-x: auto;
  }
`;
