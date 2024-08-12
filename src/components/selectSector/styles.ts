// styles.ts
import styled from "styled-components";
import ButtonComponent from "../buttons";

export const SelectSectorContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.grayscale.gray_50}; /* Adiciona a borda com a cor gray-40 */
  border-radius: 10px;
  padding-top: 20px;
  padding-right: 10px;
  padding-bottom: 20px;

  label {
    ${({ theme }) => theme.font.p.small};
    color: ${({ theme }) => theme.colors.brand.dark_blue};
    margin-bottom: 0.2em;
    display: block;
    font-weight: 500;
  }

  .add-sector-button-container {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
    justify-items: center;
  }

  span {
    ${({ theme }) => theme.font.p.medium};
    color: ${({ theme }) => theme.colors.grayscale.gray_50};
    font-weight: 600;
  }
`;

export const SelectSectorContainerPlaceholder = styled.div`
  padding: 0.8em;
  display: flex;
  align-items: center;
  gap: 1em;
  transition: 0.3s;
  border-radius: 10px;
  max-width: 200px; /* Define a largura máxima para a quebra de linha */

  /* Adiciona um padding interno ao texto para garantir que fique encostado ao lado esquerdo */
  overflow: hidden; /* Evita o estouro do conteúdo */

  &:hover {
    background-color: ${({ theme }) => theme.colors.grayscale.gray_05};
  }

  svg {
    color: ${({ theme }) => theme.colors.grayscale.gray_70};
    font-size: 3em;
  }

  span {
    ${({ theme }) => theme.font.p.medium};
    color: ${({ theme }) => theme.colors.grayscale.gray_50};
    font-weight: 400;
    word-break: break-word; /* Garante a quebra de linha quando necessário */
  }

  .selected-sector-span {
    color: ${({ theme }) => theme.colors.grayscale.gray_90};
  }
`;

export const SearchUsersContainer = styled.section`
  width: 100px;
  padding: 8px;

  .search-result {
    margin-top: 8px;
    ul {
      max-height: 100px;
      overflow-y: auto;
    }
  }
`;

export const UserCardListContainer = styled(ButtonComponent)`
  width: 100%;
  display: flex;
  justify-content: flex-start;

  .user-information {
    display: grid;

    h3 {
      ${({ theme }) => theme.font.p.small_bold};
      color: ${({ theme }) => theme.colors.grayscale.gray_50};
    }

    span {
      ${({ theme }) => theme.font.p.extra_small};
      color: ${({ theme }) => theme.colors.grayscale.gray_50};
    }
  }
`;
