import styled from "styled-components";
import ButtonComponent from "../../../../../../components/buttons";

export const TicketUserButton = styled(ButtonComponent)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  @media (max-height: 700px) {
    overflow-y: auto;
    max-height: 100vh;
  }

  span {
    ${({ theme }) => theme.font.p.extra_small};
    color: ${({ theme }) => theme.colors.brand.dark_blue};
  }
`;
