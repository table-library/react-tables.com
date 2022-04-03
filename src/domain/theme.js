export const THEME = {
  Table: `
    height: 100%;
  `,
  BaseRow: `
    background-color: var(--theme-ui-colors-background);

    &.row-select-selected, &.row-select-single-selected {
      background-color: var(--theme-ui-colors-background-secondary);
      color: var(--theme-ui-colors-text);
    }

    height: 52px;
  `,
  HeaderRow: `
    font-size: 10px;
    color: var(--theme-ui-colors-text-light);

    border-bottom: 1px solid var(--theme-ui-colors-border);
  `,
  Row: `
    font-size: 12px;
    color: var(--theme-ui-colors-text);

    &:not(:last-of-type) {
      border-bottom: 1px solid var(--theme-ui-colors-border);
    }

    &.first {
      border-top: 1px solid var(--theme-ui-colors-border);
    }

    &:hover {
      color: var(--theme-ui-colors-text);
    }
  `,
  BaseCell: `
    border-bottom: 1px solid transparent;
    border-right: 1px solid transparent;

    padding: 8px 0;

    svg {
      fill: var(--theme-ui-colors-text);
    }
  `,
};
