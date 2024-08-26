import styled from "styled-components";
import ButtonComponent from "../../buttons";

export const SelectUsersContainer = styled.div`
  label {
    ${({ theme }) => theme.font.p.small};
    color: ${({ theme }) => theme.colors.brand.dark_blue};
    margin-bottom: 0.2em;
    display: block;
    margin-bottom: 10px;
  }

  .add-user-button-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .error-container {
    margin-top: 0.5em;
  }

  .error-message {
    ${({ theme }) => theme.font.p.small};
    color: ${({ theme }) => theme.colors.support.error};
  }
`;

export const SelectUsersContainerPlaceholder = styled.div`
  padding: 0.8em;
  display: flex;
  align-items: center;
  gap: 1em;
  transition: 0.3s;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.grayscale.gray_05};

  &:hover {
    background-color: ${({ theme }) => theme.colors.grayscale.gray_20};
  }

  svg {
    color: ${({ theme }) => theme.colors.grayscale.gray_70};
    font-size: 3em;
  }

  span {
    ${({ theme }) => theme.font.p.medium};
    color: ${({ theme }) => theme.colors.grayscale.gray_70};
    font-weight: 600;

    &.selected-user-span {
      color: ${({ theme }) => theme.colors.grayscale.gray_90};
    }
  }
`;

export const SearchUsersContainer = styled.section`
  /* width: 400px; */
  padding: 8px;

  .search-result {
    margin-top: 8px;
    ul {
      max-height: 300px;
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
      text-align: left;
      ${({ theme }) => theme.font.p.small_bold};
      color: ${({ theme }) => theme.colors.grayscale.gray_90};
    }

    span {
      text-align: left;
      ${({ theme }) => theme.font.p.extra_small};
      color: ${({ theme }) => theme.colors.grayscale.gray_60};
    }
  }
`;
