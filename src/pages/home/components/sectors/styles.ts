import styled from "styled-components";

export const SectorsHomeContainer = styled.section`
  height: 200px;

  .div-sector-all {
    width: 100%;

    ul {
      max-height: 300px;
      overflow-y: auto;
      margin-top: 2em;
      padding: 10px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
    }
  }
`;
