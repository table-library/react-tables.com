export const SHARED_THEME = {
  HeaderRow: `
    font-size: 12px;
    color: var(--theme-ui-colors-text);

    border-top: 1px solid var(--theme-ui-colors-border);
    border-bottom: 1px solid var(--theme-ui-colors-border);
  `,
  Row: `
    font-size: 14px;
    color: var(--theme-ui-colors-text);

    border-bottom: 1px solid var(--theme-ui-colors-border);

    &.first {
      border-top: 1px solid var(--theme-ui-colors-border);
    }

    &:hover {
      color: var(--theme-ui-colors-text);
    }
  `,
  BaseCell: `
    padding: 16px 0;

    min-width: 20%;
    width: 20%;

    &:nth-of-type(1) {
      min-width: 40%;
      width: 40%;
    }
  `,
};

export const PRIMARY_THEME = {
  BaseRow: `
    background-color: var(--theme-ui-colors-background);
  `,
  BaseCell: `
    border-bottom: 1px solid transparent;
    border-right: 1px solid var(--theme-ui-colors-border);

    &:first-of-type {
      padding-left: 24px;
    }
  `,
};

export const SECONDARY_THEME = {
  BaseRow: `
    background-color: var(--theme-ui-colors-background-secondary);
  `,
  BaseCell: `
    border-bottom: 1px solid transparent;
    border-right: 1px solid transparent;

    &:first-of-type {
      padding-left: 48px;
    }
  `,
};
