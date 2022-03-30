import axios from 'axios';

import { DEFAULT_CATEGORY } from './config';

const onError = (error) => {
  console.log(error);
  console.log('local API may not be running');
  return [];
};

export const queryCurrencies =
  ({ page, size, category }) =>
  () => {
    const extra =
      category !== DEFAULT_CATEGORY ? `category=${category}&` : '';

    return axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/?proxy=${btoa(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&${extra}order=market_cap_desc&per_page=${size}&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y`
        )}`
      )
      .then((result) => result.data)
      .catch(onError);
  };

export const queryMarkets = (id) => () =>
  axios
    .get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/?proxy=${btoa(
        `https://api.coingecko.com/api/v3/coins/${id}/tickers?per_page=5&page=1&include_exchange_logo=true`
      )}`
    )
    .then((res) => res.data)
    .catch(onError);
