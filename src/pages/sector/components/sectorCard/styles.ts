import styled from "styled-components";

export const SectorComponent = styled.section`
  .all-sector {
    width: 100%;
    max-width: 500px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    padding: 15px;
    gap: 10px;
    background-color: white;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      transform: translateY(-5px);
    }

    p {
      ${({ theme }) => theme.font.p.extra_small};
      color: ${({ theme }) => theme.colors.grayscale.gray_80};
      text-align: start;
    }

    h2 {
      ${({ theme }) => theme.font.p.small};
    font-weight: 500;
    color: ${({ theme }) => theme.colors.brand.dark_blue};
    }

    h3 {
      ${({ theme }) => theme.font.p.normal  };
    font-weight: 500;
    color: ${({ theme }) => theme.colors.brand.dark_blue};
    }
  }

  .header-sector {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 30px;
    gap: 20px;
  }

  .p-sector {
    display: grid;
    grid-template-columns: 1fr 25px;
  }
`;
