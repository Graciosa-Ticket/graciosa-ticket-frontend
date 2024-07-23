import styled from "styled-components";

export const SectorsHomeContainer = styled.section`
  height: 200px;

  .div-sector-all {
    width: 100%;

    ul {
      margin-top: 2em;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }
  }
`;
