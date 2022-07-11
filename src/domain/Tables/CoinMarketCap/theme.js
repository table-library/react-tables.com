const disablePin = `
  @media screen and (max-width: 920px) {
    &.pin-left, &.pin-right {
      position: static;
      z-index: 1;
    }
  }
`;

export const CUSTOM_SHARED_THEME = ({
  isLightMode,
  isLightModeFinished,
}) => ({
  Table: `
    --data-table-library_grid-template-columns:  80px 80px 240px repeat(6, minmax(20%, 1fr)) 80px;
  `,
  BaseRow: `
    font-size: 14px;
    color: var(--theme-ui-colors-text);

    &:hover {
      color: var(--theme-ui-colors-text);
    }

    border-bottom: 1px solid #D4D4D4;
  `,
  HeaderRow: `
    font-size: 12px;
    border-top: none;
  `,
  Row: `
    font-size: 14px;
  `,
  BaseCell: `
    height: 54px;
    padding: 0 16px;

    ${disablePin}

    &:nth-of-type(1) {
      left: 0px;
    }

    &:nth-of-type(2) {
      left: 80px;
    }

    &:nth-of-type(3) {
      left: 160px;
    }

    background-color: var(--theme-ui-colors-background-secondary);

    &:nth-of-type(1), &:nth-of-type(2), &:nth-of-type(3), &:last-of-type {
      background-color: var(--theme-ui-colors-background);
    }

    &:nth-of-type(3) {
      ${
        isLightMode
          ? ''
          : 'border-right: 1px solid var(--theme-ui-colors-border);'
      }
      ${
        isLightModeFinished
          ? 'box-shadow: 5px 0 5px -2px #dadada;'
          : ''
      }
    }

    &:last-of-type {
      right: 0;

      ${
        isLightMode
          ? ''
          : 'border-left: 1px solid var(--theme-ui-colors-border);'
      }
      ${
        isLightModeFinished
          ? 'box-shadow: -5px 0 5px -2px #dadada;'
          : ''
      }

      & > div {
        flex: 1;
        display: flex;
        justify-content: center;
      }
    }

    & .MuiLinearProgress-colorPrimary {
      background-color: var(--theme-ui-colors-error);
    }

    & .MuiLinearProgress-barColorPrimary {
      background-color: var(--theme-ui-colors-success);
    }
  `,
});

export const CUSTOM_PRIMARY_THEME = {};

export const CUSTOM_SECONDARY_THEME = {
  Table: `
    display: inherit;
  `,
  BaseRow: `
    background-color: var(--theme-ui-colors-background);
  `,
};
