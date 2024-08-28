import styled from "styled-components";

export const SelectButtonsArea = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.colors.brand.white};
  z-index: 1;
  padding: 0px 20px;
  display: flex;
  gap: 20px;
  width: 100%;
`;

export const SuggestionsListModalComponent = styled.section`
  padding: 8px 20px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.brand.white};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 500px;
  overflow-y: auto;

  .ticket-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    max-width: 600px;
    overflow-y: auto;
  }
`;
