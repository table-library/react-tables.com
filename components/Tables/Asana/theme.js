export const SHARED_THEME = {
  HeaderRow: `
    font-size: 12px;
    color: #dcdcdc;

    border-top: 1px solid #515151;
    border-bottom: 1px solid #515151;
  `,
  Row: `
    font-size: 14px;
    color: #ffffff;

    border-bottom: 1px solid #515151;

    &.first {
      border-top: 1px solid #515151;
    }

    &:hover {
      color: #ffffff;
    }
  `,
  BaseCell: `
    padding: 16px 0;

    min-width: 20%;
    width: 20%;

    &:first-of-type {
      padding-left: 24px;
    }

    &:nth-of-type(1) {
      min-width: 40%;
      width: 40%;
    }
  `,
};

export const PRIMARY_THEME = {
  BaseRow: `
    background-color: #0d0a1d;
  `,
  BaseCell: `
    border-bottom: 1px solid transparent;
    border-right: 1px solid #515151;

    &:first-of-type {
      padding-left: 24px;
    }

    min-width: 20%;
    width: 20%;

    &:nth-of-type(1) {
      min-width: 40%;
      width: 40%;
    }
  `,
};

export const SECONDARY_THEME = {
  BaseRow: `
    background-color: #1d1229;
  `,
  BaseCell: `
    border-bottom: 1px solid transparent;
    border-right: 1px solid transparent;

    &:first-of-type {
      padding-left: 48px;
    }
  `,
};
