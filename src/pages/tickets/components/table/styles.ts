import styled from "styled-components";

export const TableContainer = styled.div`
  .InovuaReactDataGrid {
    border: 0;
    border-radius: 0.5em;
    overflow: hidden;
    background-color: transparent;

    .InovuaReactDataGrid__header {
      background-color: transparent;
      border-bottom: solid 1px ${({ theme }) => theme.colors.grayscale.gray_10};

      .InovuaReactDataGrid__column-header__resize-wrapper {
        border: 0;
      }

      .InovuaReactDataGrid__column-header__content {
        ${({ theme }) => theme.font.p.extra_small};
        color: ${({ theme }) => theme.colors.grayscale.gray_80};
      }
    }

    .InovuaReactDataGrid__row {
      background-color: transparent;

      .InovuaReactDataGrid__row-cell-wrap.InovuaReactDataGrid__row-cell-wrap.InovuaReactDataGrid__row-cell-wrap {
        transition: 300ms;

        &:hover {
          background-color: ${({ theme }) => theme.colors.grayscale.gray_10};

          .InovuaReactDataGrid__cell__content {
            color: ${({ theme }) => theme.colors.grayscale.gray_90};
          }
        }
      }
    }

    .InovuaReactDataGrid__cell {
      border-width: 1px 0;

      .InovuaReactDataGrid__cell__content {
        ${({ theme }) => theme.font.p.small};
        color: ${({ theme }) => theme.colors.grayscale.gray_90};
      }
    }
  }
`;
