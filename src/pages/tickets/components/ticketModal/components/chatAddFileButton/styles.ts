import styled from "styled-components";

export const ChatAddFilesButtonContainer = styled.button`
  color: ${({ theme }) => theme.colors.brand.dark_blue};
  border-radius: 0.5em;
  display: flex;
  flex-direction: column;

  h3 {
    margin-top: 5px;
    margin-left: 2px;
    margin-bottom: 5px;
    color: ${({ theme }) => theme.colors.brand.dark_blue};
    ${({ theme }) => theme.font.p.small};
  }

  #fileInput {
    display: none;
  }

  .label-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border-radius: 0.5em;
    padding: 8px;
    cursor: pointer;
    ${({ theme }) => theme.font.p.normal};
    margin-top: 2px;
    margin-left: 2px;
    text-align: center;
    transition: 300ms;

    background-color: ${({ theme }) => theme.colors.brand.blue};
    color: white;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);

    &:hover {
      background-color: ${({ theme }) => theme.colors.brand.dark_blue};
      color: ${({ theme }) => theme.colors.brand.white};
      transition: background-color 0.3s ease;
    }
  }

  .file-list {
    width: 80%;
    max-height: 250px;
    padding: 0.8em 0.8em;
    color: ${({ theme }) => theme.colors.grayscale.gray_50};
    ${({ theme }) => theme.font.p.normal};
    border-radius: 0.5em;
    border: 1px solid;
    margin-top: 2px;
    text-align: center;
    overflow-y: auto;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .file-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.4em;

    p {
      color: ${({ theme }) => theme.colors.brand.blue};
      ${({ theme }) => theme.font.p.normal};
    }

    .remove-icon {
      color: ${({ theme }) => theme.colors.brand.blue};
      cursor: pointer;

      &:hover {
        background-color: ${({ theme }) => theme.colors.brand.blue};
        color: ${({ theme }) => theme.colors.brand.white};
        transition: background-color 0.3s ease;
      }
    }
  }
`;
