import styled from "styled-components";

export const SectorModalComponent = styled.section`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  padding: 0 15px 15px;
  gap: 10px;
  background-color: white;
  transition: transform 0.2s ease-in-out;
  position: relative;

  p{
    ${({ theme }) => theme.font.p.medium};
    color: ${({ theme }) => theme.colors.brand.dark_blue};
  }

  h3{
    ${({ theme }) => theme.font.p.normal};
    color: ${({ theme }) => theme.colors.grayscale.gray_80};
    font-weight: 600;
    max-width: 80px;
  }



  .footer {
    display: grid;
    grid-template-columns: 100px 1fr 1fr;
    justify-content: flex-end;
    margin-top: auto;
    gap: 20px;
  }

  .avatar-img{
    width: 60px;
    height: 60px;
  }
`;