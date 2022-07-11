export const SHARED_THEME = {
  Table: `
    --data-table-library_grid-template-columns:  40% repeat(3, minmax(20%, 1fr));
  `,
  HeaderRow: `
    font-size: 12px;
    color: var(--theme-ui-colors-text);

    .th {
      border-top: 1px solid var(--theme-ui-colors-border);
      border-bottom: 1px solid var(--theme-ui-colors-border);
    }
  `,
  Row: `
    font-size: 14px;
    color: var(--theme-ui-colors-text);

    .td {
      border-top: 1px solid var(--theme-ui-colors-border);
      border-bottom: 1px solid var(--theme-ui-colors-border);
    }

    &:hover {
      color: var(--theme-ui-colors-text);
    }
  `,
  BaseCell: `
    padding: 16px 16px;
  `,
};

export const PRIMARY_THEME = {
  BaseRow: `
    background-color: var(--theme-ui-colors-background);
  `,
  BaseCell: `
    border-bottom: 1px solid transparent;

    &:not(:last-of-type) {
      border-right: 1px solid var(--theme-ui-colors-border);
    }

    &:first-of-type {
      padding-left: 24px;
    }
  `,
};

export const SECONDARY_THEME = {
  Table: `
    display: inherit;
  `,
  BaseRow: `
    background-color: var(--theme-ui-colors-background-secondary);
  `,
  BaseCell: `
    border-bottom: 1px solid transparent;
    border-right: 1px solid transparent;

    &:first-of-type {
      padding-left: 48px;
      grid-column: 1 / span 4;
    }
  `,
};
