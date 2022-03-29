export const THEME = {
  BaseRow: `
    background-color: #0d0a1d;
  `,
  HeaderRow: `
    font-size: 10px;
    color: #dcdcdc;

    border-top: 1px solid #515151;
    border-bottom: 1px solid #515151;
  `,
  Row: `
    font-size: 12px;
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
    border-bottom: 1px solid transparent;
    border-right: 1px solid transparent;

    padding: 8px 0;
  `,
};
