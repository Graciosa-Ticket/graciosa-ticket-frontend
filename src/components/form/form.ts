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
`;

export const FormButtonsContainer = styled.div<formContentProps>`
  margin-top: 30px;
  display: grid;
  grid-template-columns: ${({ $columns = 1 }) => `repeat(${$columns}, 1fr)`};
  gap: 1em;
  margin-bottom: 10px;
  margin-right: 10px;

  .cancel-button {
    color: ${({ theme }) => theme.colors.brand.black};
    &:hover {
      color: white;
    }
  }
`;
