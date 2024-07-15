import styled from "styled-components";

export const EditedFormContainer = styled.div`
  min-width: 250px;
  padding: 10px 1em;

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
