import styled from "styled-components";
import ButtonComponent from "../../../buttons";

export const SelectUserContainer = styled(ButtonComponent)`
  display: flex;
  align-items: center;
  gap: 10px;

  h5 {
    ${({ theme }) => theme.font.p.small};
    color: ${({ theme }) => theme.colors.grayscale.gray_70};
  }
`;
