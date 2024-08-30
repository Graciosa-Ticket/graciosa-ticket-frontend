import styled from "styled-components";

export const EditedFormContainer = styled.div`
  min-width: 400px;
  padding: 10px 1em;

  .alert-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.colors.support.warning};
  }

  p {
    text-align: center;
    ${({ theme }) => theme.font.p.normal};
    color: ${({ theme }) => theme.colors.grayscale.gray_90};
  }

  .buttons-container {
    display: flex;
    margin-top: 30px;
    gap: 20px;
    justify-content: flex-end;
  }
`;
