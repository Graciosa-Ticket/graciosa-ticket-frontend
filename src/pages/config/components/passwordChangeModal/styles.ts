import styled from "styled-components";

export const PasswordChangeModalComponent = styled.section`
  gap: 20px;
  padding: 20px;
  min-width: 400px;

  @media (max-height: 650px) {
    overflow-y: auto;
    max-height: 60vh;
  }
`;
