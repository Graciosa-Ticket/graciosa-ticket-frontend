import styled from "styled-components";

export const ActionModalContainer = styled.section`
  padding: 10px 1em;

  .content-container {
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      max-width: 250px;
      ${({ theme }) => theme.font.p.normal};
      color: ${({ theme }) => theme.colors.grayscale.gray_80};
      text-align: center;
    }
  }

  .buttons-container {
    display: flex;
    margin-top: 30px;
    gap: 20px;
    justify-content: flex-end;
  }
`;
