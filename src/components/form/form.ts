import styled from "styled-components";

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

interface formContentProps {
  $columns?: number;
}

export const FormContentContainer = styled.div<formContentProps>`
  display: grid;
  flex: 1;
  grid-template-columns: ${({ $columns = 1 }) => `repeat(${$columns}, 1fr)`};
  gap: 1em;
  overflow-y: auto;
  align-content: baseline;
  padding: 0 4px 0 0;

  .file-list {
    width: 100%;
    padding: 0.8em 0.8em;
    color: ${({ theme }) => theme.colors.grayscale.gray_30};
    ${({ theme }) => theme.font.p.normal};
    border-radius: 0.5em;
    border: 1px solid;
  }

  .file-item {
    display: flex;
    gap: 8px;
    align-items: center;

    p {
      justify-content: center;
    }
  }
`;

export const FormButtonsContainer = styled.div<formContentProps>`
  margin-top: 30px;
  display: grid;
  grid-template-columns: ${({ $columns = 1 }) => `repeat(${$columns}, 1fr)`};
  gap: 1em;
`;
