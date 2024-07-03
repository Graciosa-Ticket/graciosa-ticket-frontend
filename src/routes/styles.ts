import styled from "styled-components";

export const DefaultContainer = styled.section`
  width: 100%;
  min-height: 100vh;
  max-height: 100vh;
  padding: 0 20px;

  .page-default {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 760px) {
    .menu-default-container {
      display: none;
    }
  }
`;
