import styled from "styled-components";

export const EditedFormContainer = styled.div`
  min-width: 250px;

  p {
    text-align: left;
    ${({ theme }) => theme.font.p.small};
    color: ${({ theme }) => theme.colors.grayscale.gray_60};
  }

  .buttons-container {
    display: flex;
    margin-top: 30px;
    gap: 20px;
    justify-content: flex-end;
  }
`;
