import styled from "styled-components";

export const SectorContainer = styled.section`

  .div-sector-all {
    width: 100%;

    ul {
      margin-top: 2em;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
    }
  }
`;
