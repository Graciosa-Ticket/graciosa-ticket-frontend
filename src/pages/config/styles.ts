import styled, { keyframes } from "styled-components";

const entranceAnimation = keyframes`

from{
  transform: rotateX(180);
  opacity: 0;
}

to{
  transform: rotateX(0);
  opacity: 1;
}
`;

export const Configontainer = styled.section`

  .cards-sector {
    margin-top: 2em;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(147px, 1fr));
    gap: 20px;
  }

  .card {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    padding: 12px;
    gap: 20px;
    background-color: ${({ theme }) => theme.colors.brand.white};
    transition: 0.2s ease-in-out;
    align-items: center;
    animation: 0.5s ${entranceAnimation} ease;
    transform-origin: left;
    ${({ theme }) => theme.font.p.large };
    font-weight: 700;
    color: ${({ theme }) => theme.colors.brand.dark_blue};
    &:hover {
      transform: translateY(-3px);
    }
  }
`;
