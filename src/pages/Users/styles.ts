import styled from "styled-components";

export const UserContainer = styled.section`
  .search-user {
    margin-left: 20 px;
  }
  .select-buttons-area {
    margin-top: 2em;
    display: flex;
    gap: 20px;
    width: 100%;
  }

  .user-cards {
    margin: 2em 0;

    .letter-section {
      display: flex;
      flex-direction: column;
      gap: 60px;

      .letter-box {
        .box-title {
          display: flex;
          align-items: center;
          gap: 1em;

          h6 {
            ${({ theme }) => theme.font.p.small};
            color: ${({ theme }) => theme.colors.grayscale.gray_70};
          }

          .line {
            flex: 1;
            height: 1px;
            background-color: ${({ theme }) => theme.colors.grayscale.gray_20};
          }
        }
      }

      ul {
        margin-top: 12px;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(147px, 1fr));
        gap: 20px;
      }
    }
  }

  .select-button {
    font-weight: 700;
    width: 15%;
    justify-content: center;
    ${({ theme }) => theme.font.p.extra_small_bold};
  }
`;
