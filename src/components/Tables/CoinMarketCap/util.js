export const twoDecimals = (integer) =>
  Number((Math.round(integer * 100) / 100).toFixed(2));
