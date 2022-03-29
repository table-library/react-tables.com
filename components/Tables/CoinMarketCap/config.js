export const PRICE_CHANGE_PERCENTAGE = {
  price_change_percentage_1h_in_currency: {
    label: '1h %',
  },
  price_change_percentage_24h_in_currency: {
    label: '24h %',
  },
  price_change_percentage_7d_in_currency: {
    label: '7d %',
  },
  price_change_percentage_14d_in_currency: {
    label: '14d %',
  },
  price_change_percentage_30d_in_currency: {
    label: '30d %',
  },
  price_change_percentage_200d_in_currency: {
    label: '200d %',
  },
  price_change_percentage_1y_in_currency: {
    label: '1y %',
  },
};

export const CATEGORIES = {
  cryptocurrencies: {
    label: 'Cryptocurrencies',
  },
  'decentralized-finance-defi': {
    label: 'DeFi',
  },
  'non-fungible-tokens-nft': {
    label: 'NFT',
  },
  metaverse: {
    label: 'Metaverse',
  },
};

export const CUSTOM_COLUMNS = {
  ath: {
    label: 'ATH',
    render: (item) =>
      item.ath.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      }),
  },
  atl: {
    label: 'ATL',
    render: (item) =>
      item.atl.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      }),
  },
  high24: {
    label: '24h high',
    render: (item) =>
      item.high_24h.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      }),
  },
  low24: {
    label: '24h low',
    render: (item) =>
      item.low_24h.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      }),
  },
};

export const DEFAULT_PAGE = 1;
export const DEFAULT_SIZE = 10;
export const DEFAULT_CATEGORY = 'cryptocurrencies';
