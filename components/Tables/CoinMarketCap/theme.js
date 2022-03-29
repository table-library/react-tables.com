export const CUSTOM_SHARED_THEME = {
  BaseRow: `
    height: 54px;

    font-size: 14px;
    color: #ffffff;

    &:hover {
      color: #f8fafd;
    }
  `,
  HeaderRow: `
    font-size: 12px;

    border-top: none;
    border-bottom: 1px solid #515151;
  `,
  Row: `
    font-size: 14px;

    border-bottom: 1px solid #515151;
  `,
  BaseCell: `
    padding-top: 16px 16px;

    border-top: 1px solid transparent;
    border-right: 1px solid transparent;
    border-bottom: 1px solid transparent;

    min-width: 20%;
    width: 20%;

    &:nth-of-type(1) {
      left: 0px;

      min-width: 80px;
      width: 80px;
    }

    &:nth-of-type(2) {
      left: 80px;

      min-width: 80px;
      width: 80px;
    }

    &:nth-of-type(3) {
      left: 160px;

      min-width: 240px;
      width: 240px;
    }

    background-color: #1d1229;

    &:nth-of-type(1), &:nth-of-type(2), &:nth-of-type(3), &:last-of-type {
      background-color: #0d0a1d;
    }

    &:nth-of-type(3) {
      border-right: 1px solid #515151;
    }

    &.small {
      min-width: 200px;
      width: 200px;
    }

    &:last-of-type {
      right: 0;

      min-width: 80px;
      width: 80px;

      border-left: 1px solid #515151;

      & > div {
        display: flex;
        justify-content: center;
      }
    }
  `,
};

export const CUSTOM_PRIMARY_THEME = {};

export const CUSTOM_SECONDARY_THEME = {
  Table: `
    overflow: inherit;
  `,
  BaseRow: `
    background-color: #0d0a1d;
  `,
};
