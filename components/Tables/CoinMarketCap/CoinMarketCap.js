/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import {
  useQueries,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import axios from 'axios';
import useLocalStorageState from 'use-local-storage-state';
import TablePagination from '@mui/material/TablePagination';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import PieChartIcon from '@mui/icons-material/PieChart';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import { Sparklines, SparklinesLine } from 'react-sparklines';

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from '@table-library/react-table-library/table';
import { useTheme } from '@table-library/react-table-library/theme';
import { usePagination } from '@table-library/react-table-library/pagination';

import { TableThemeProvider, AlignCenter, Ellipse } from '../shared';

import {
  PRICE_CHANGE_PERCENTAGE,
  CATEGORIES,
  CUSTOM_COLUMNS,
  DEFAULT_PAGE,
  DEFAULT_SIZE,
  DEFAULT_CATEGORY,
} from './config';
import {
  CUSTOM_SHARED_THEME,
  CUSTOM_PRIMARY_THEME,
  CUSTOM_SECONDARY_THEME,
} from './theme';
import {
  BlurryOverlay,
  OverlayLoading,
  Relative,
  Loading,
  StyledSelect,
  Indicator,
} from './styles';

const queryClient = new QueryClient();

const twoDecimals = (integer) =>
  Number((Math.round(integer * 100) / 100).toFixed(2));

const MarketsTable = ({ data, customColumnsActive }) => {
  const theme = useTheme([
    CUSTOM_SHARED_THEME,
    CUSTOM_SECONDARY_THEME,
  ]);

  return (
    <Table
      data={data}
      theme={theme}
      layout={{
        custom: true,
        horizontalScroll: true,
        inheritLayout: true,
      }}
    >
      {(tableListSecondary) => (
        <>
          <Header>
            <HeaderRow>
              <HeaderCell pinLeft />
              <HeaderCell pinLeft>#</HeaderCell>
              <HeaderCell pinLeft>Market</HeaderCell>
              <HeaderCell>Market Price</HeaderCell>
              <HeaderCell>Volume</HeaderCell>
              <HeaderCell>Confidence</HeaderCell>
              <HeaderCell />
              <HeaderCell />
              <HeaderCell />
              {customColumnsActive.map((column) => (
                <HeaderCell key={column} className="small" />
              ))}
              <HeaderCell pinRight />
            </HeaderRow>
          </Header>

          <Body>
            {tableListSecondary.map((item, index) => (
              <React.Fragment key={item.id}>
                <Row item={item}>
                  <Cell pinLeft />
                  <Cell pinLeft>{index}</Cell>
                  <Cell pinLeft>
                    <AlignCenter>
                      <img
                        src={item.market.logo}
                        width={20}
                        height={20}
                      />
                      &nbsp;{item.market.name}
                    </AlignCenter>
                  </Cell>
                  <Cell>
                    <AlignCenter>
                      {twoDecimals(
                        item.converted_last.usd
                      ).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                      &nbsp;
                      <Chip
                        label="Buy"
                        style={{ color: '#31f531' }}
                        variant="outlined"
                        size="small"
                        clickable
                        onClick={() =>
                          window.open(item.trade_url, '_newtab')
                        }
                      />
                    </AlignCenter>
                  </Cell>
                  <Cell>
                    {twoDecimals(
                      item.converted_volume.usd
                    ).toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </Cell>
                  <Cell>
                    <Chip
                      label={item.trust_score}
                      style={{
                        color:
                          item.trust_score === 'green'
                            ? '#31f531'
                            : 'red',
                      }}
                      variant="outlined"
                    />
                  </Cell>
                  <Cell />
                  <Cell />
                  <Cell />
                  {customColumnsActive.map((column) => (
                    <Cell key={column} className="small" />
                  ))}
                  <Cell pinRight />
                </Row>
              </React.Fragment>
            ))}
          </Body>
        </>
      )}
    </Table>
  );
};

const ViewMarket = ({
  marketData,
  item,
  isExpanded,
  onOpen,
  onClose,
}) => {
  if (!marketData && isExpanded) {
    return (
      <IconButton disabled size="small">
        <CircularProgress size={20} />
      </IconButton>
    );
  }

  if (isExpanded) {
    return (
      <IconButton size="small" onClick={() => onClose(item.id)}>
        <CloseIcon fontSize="small" />
      </IconButton>
    );
  }

  return (
    <IconButton
      size="small"
      onClick={(event) => onOpen(event, item.id)}
    >
      <MoreVertIcon fontSize="small" />
    </IconButton>
  );
};

const queryCurrencies =
  ({ page, size, category }) =>
  () => {
    let extra = '';
    if (category !== DEFAULT_CATEGORY) {
      extra = `category=${category}&`;
    }

    return axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/?proxy=${btoa(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&${extra}order=market_cap_desc&per_page=${size}&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y`
        )}`
      )
      .then((result) => result.data)
      .catch((error) => {
        console.log(error);
        console.log('local API may not be running');
        return [];
      });
  };

const queryMarkets = (id) => () =>
  axios
    .get(
      `${
        process.env.NEXT_PUBLIC_BASE_URL
      }/?proxy=${`https://api.coingecko.com/api/v3/coins/${id}/tickers?per_page=5&page=1&include_exchange_logo=true`}`
    )
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
      console.log('local API may not be running');
      return [];
    });

const CoinsTable = () => {
  // dropdown

  const [isDropdownOpen, setDropdownOpen] = React.useState(null);
  const handleDropdownOpen = (event, id) =>
    setDropdownOpen({ element: event.currentTarget, id });
  const handleDropdownClose = () => setDropdownOpen(null);

  // expand

  const [expandedMarketIds, setExpandedMarketIds] = React.useState(
    []
  );

  const handleExpand = (incomingId) => {
    const id = incomingId ?? isDropdownOpen.id;

    if (expandedMarketIds.includes(id)) {
      setExpandedMarketIds(
        expandedMarketIds.filter((value) => value !== id)
      );
    } else {
      setExpandedMarketIds(expandedMarketIds.concat(id));
    }
  };

  // percentages

  const [percentageUnitOne, setPercentageUnitOne] = React.useState(
    'price_change_percentage_24h_in_currency'
  );

  const [percentageUnitTwo, setPercentageUnitTwo] = React.useState(
    'price_change_percentage_7d_in_currency'
  );

  // watchlist

  const [isWatchlistActive, setWatchlistActive] =
    React.useState(false);
  const [favorites, setFavorites] = useLocalStorageState(
    'favorites',
    {
      defaultValue: [],
    }
  );

  // customize

  const [isCustomizeActive, setCustomizeActive] =
    React.useState(false);
  const [customColumnsActive, setCustomColumnsActive] =
    React.useState([]);

  // theming

  const theme = useTheme([CUSTOM_SHARED_THEME, CUSTOM_PRIMARY_THEME]);

  // data

  const [currencies, setCurrencies] = React.useState([]);
  const [fetchState, setFetchState] = React.useState({
    isLoading: false,
    isOverlayLoading: false,
    error: null,
  });

  const fetchCurrencies = async (
    { page, size, category },
    fetchState
  ) => {
    setFetchState(fetchState);
    setCurrencies(
      await queryClient.fetchQuery(
        'currencies',
        queryCurrencies({ page, size, category })
      )
    );
    setFetchState({
      isLoading: false,
      isOverlayLoading: false,
      error: null,
    });
  };

  const marketsData = useQueries(
    expandedMarketIds.map((id) => ({
      queryKey: ['market', id],
      queryFn: queryMarkets(id),
    }))
  );

  const data = { nodes: isWatchlistActive ? favorites : currencies };

  // category

  const [activeCategory, setActiveCategory] =
    React.useState(DEFAULT_CATEGORY);

  React.useEffect(() => {
    const size = activeCategory === DEFAULT_CATEGORY ? 10 : 50; // TODO

    pagination.fns.onSetPage(DEFAULT_PAGE);
    pagination.fns.onSetSize(size);

    fetchCurrencies(
      { page: DEFAULT_PAGE, size: size, category: activeCategory },
      { overlayLoading: true }
    );
  }, [activeCategory]);

  // pagination

  const pagination = usePagination(
    data,
    {
      state: {
        page: DEFAULT_PAGE,
        size: DEFAULT_SIZE,
      },
      onChange: onPaginationChange,
    },
    {
      isServer: isWatchlistActive ? false : true,
    }
  );

  function onPaginationChange(action, state) {
    fetchCurrencies(
      {
        page: state.page + 1,
        size: state.size,
        category: activeCategory,
      },
      { isOverlayLoading: true }
    );
  }

  // watchlist handler

  const handleFavorite = (item) => {
    if (favorites.map((value) => value.id).includes(item.id)) {
      setFavorites(favorites.filter((value) => value.id !== item.id));
    } else {
      setFavorites(favorites.concat(item));
    }
  };

  const handleWatchList = () => {
    pagination.fns.onSetPage(DEFAULT_PAGE);
    pagination.fns.onSetSize(DEFAULT_SIZE);
    setWatchlistActive(!isWatchlistActive);
  };

  // reactive query

  React.useEffect(() => {
    fetchCurrencies(
      {
        page: DEFAULT_PAGE,
        size: DEFAULT_SIZE,
        category: activeCategory,
      },
      { isLoading: true }
    );
  }, [activeCategory]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        style={{ borderBottom: '1px solid #515151' }}
      >
        <Stack direction="row" spacing={1} m={1}>
          <Button
            color={isWatchlistActive ? 'primary' : 'secondary'}
            size="small"
            startIcon={
              isWatchlistActive ? <StarIcon /> : <StarOutlineIcon />
            }
            onClick={handleWatchList}
          >
            Watchlist
          </Button>
          <Button
            color="secondary"
            size="small"
            startIcon={<PieChartIcon />}
            onClick={() => {}}
          >
            Portfolio
          </Button>
          <Divider orientation="vertical" flexItem />
          {Object.keys(CATEGORIES).map((key) => (
            <Button
              key={key}
              size="small"
              color={key === activeCategory ? 'primary' : 'secondary'}
              onClick={() => setActiveCategory(key)}
            >
              {CATEGORIES[key].label}
            </Button>
          ))}
        </Stack>

        <Stack direction="row" spacing={1} m={1}>
          <Button
            color={isCustomizeActive ? 'primary' : 'secondary'}
            size="small"
            onClick={() => setCustomizeActive(!isCustomizeActive)}
          >
            Customize
          </Button>
        </Stack>
      </Stack>

      {isCustomizeActive && (
        <Stack
          direction="row"
          justifyContent="space-between"
          style={{ borderBottom: '1px solid #515151' }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            m={1}
          >
            <small
              style={{ color: '#ce93d8', textTransform: 'uppercase' }}
            >
              Add Columns:
            </small>

            {Object.keys(CUSTOM_COLUMNS).map((key) => (
              <Button
                key={key}
                color={
                  customColumnsActive.includes(key)
                    ? 'primary'
                    : 'secondary'
                }
                size="small"
                onClick={() =>
                  customColumnsActive.includes(key)
                    ? setCustomColumnsActive(
                        customColumnsActive.filter(
                          (value) => value !== key
                        )
                      )
                    : setCustomColumnsActive(
                        customColumnsActive.concat(key)
                      )
                }
              >
                {CUSTOM_COLUMNS[key].label}
              </Button>
            ))}
          </Stack>

          <Stack direction="row" spacing={1} m={1}>
            {!!customColumnsActive.length && (
              <Button
                color="secondary"
                size="small"
                onClick={() => setCustomColumnsActive([])}
              >
                Clear Columns
              </Button>
            )}
          </Stack>
        </Stack>
      )}

      <div style={{ position: 'relative' }}>
        <Table
          data={data}
          theme={theme}
          layout={{ custom: true, horizontalScroll: true }}
          pagination={pagination}
        >
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell resize pinLeft />
                  <HeaderCell resize pinLeft>
                    #
                  </HeaderCell>
                  <HeaderCell resize pinLeft>
                    Name
                  </HeaderCell>
                  <HeaderCell resize>Price</HeaderCell>
                  <HeaderCell resize>
                    <StyledSelect
                      value={percentageUnitOne}
                      onChange={(event) =>
                        setPercentageUnitOne(event.target.value)
                      }
                    >
                      {Object.keys(PRICE_CHANGE_PERCENTAGE).map(
                        (key) => (
                          <MenuItem key={key} value={key}>
                            {PRICE_CHANGE_PERCENTAGE[key].label}
                          </MenuItem>
                        )
                      )}
                    </StyledSelect>
                  </HeaderCell>
                  <HeaderCell resize>
                    <StyledSelect
                      value={percentageUnitTwo}
                      onChange={(event) =>
                        setPercentageUnitTwo(event.target.value)
                      }
                    >
                      {Object.keys(PRICE_CHANGE_PERCENTAGE).map(
                        (key) => (
                          <MenuItem key={key} value={key}>
                            {PRICE_CHANGE_PERCENTAGE[key].label}
                          </MenuItem>
                        )
                      )}
                    </StyledSelect>
                  </HeaderCell>
                  <HeaderCell resize>Market Cap</HeaderCell>
                  <HeaderCell resize>Circulating Supply</HeaderCell>
                  <HeaderCell>Last 7 Days</HeaderCell>
                  {customColumnsActive.map((column) => (
                    <HeaderCell key={column} className="small">
                      <AlignCenter>
                        {CUSTOM_COLUMNS[column].label}&nbsp;
                        <IconButton
                          size="small"
                          onClick={() =>
                            setCustomColumnsActive(
                              customColumnsActive.filter(
                                (value) => value !== column
                              )
                            )
                          }
                        >
                          <CloseIcon />
                        </IconButton>
                      </AlignCenter>
                    </HeaderCell>
                  ))}
                  <HeaderCell pinRight />
                </HeaderRow>
              </Header>

              <Body>
                {tableList.map((item) => {
                  const marketData = marketsData?.find(
                    (market) =>
                      market?.data?.name.toLowerCase() ===
                      item.id.toLowerCase()
                  );

                  return (
                    <React.Fragment key={item.id}>
                      <Row item={item}>
                        <Cell pinLeft>
                          <Tooltip
                            title="Add to Main Watchlist"
                            arrow
                          >
                            <IconButton
                              size="small"
                              onClick={() => handleFavorite(item)}
                            >
                              {favorites
                                .map((value) => value.id)
                                .includes(item.id) ? (
                                <StarIcon fontSize="small" />
                              ) : (
                                <StarOutlineIcon fontSize="small" />
                              )}
                            </IconButton>
                          </Tooltip>
                        </Cell>
                        <Cell pinLeft>{item.market_cap_rank}</Cell>
                        <Cell pinLeft>
                          <AlignCenter>
                            <img
                              alt="icon"
                              src={item.image}
                              width={20}
                              height={20}
                            />
                            <Ellipse>
                              &nbsp;{item.name}&nbsp;
                              <span style={{ color: '#808a9d' }}>
                                {item.symbol.toUpperCase()}
                              </span>
                            </Ellipse>
                          </AlignCenter>
                        </Cell>
                        <Cell>
                          {item.current_price.toLocaleString(
                            'en-US',
                            {
                              style: 'currency',
                              currency: 'USD',
                            }
                          )}
                        </Cell>
                        <Cell>
                          <Indicator
                            value={twoDecimals(
                              item[percentageUnitOne]
                            )}
                            suffix="%"
                          />
                        </Cell>
                        <Cell>
                          <Indicator
                            value={twoDecimals(
                              item[percentageUnitTwo]
                            )}
                            suffix="%"
                          />
                        </Cell>
                        <Cell>
                          {item.market_cap.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                          })}
                        </Cell>
                        <Cell>
                          {item.circulating_supply}&nbsp;
                          {item.symbol.toUpperCase()}
                          {item.max_supply && (
                            <LinearProgress
                              variant="determinate"
                              value={twoDecimals(
                                (item.circulating_supply /
                                  item.max_supply) *
                                  100
                              )}
                            />
                          )}
                        </Cell>
                        <Cell>
                          <Sparklines
                            data={item.sparkline_in_7d.price}
                            height={40}
                          >
                            <SparklinesLine color="#31f531" />
                          </Sparklines>
                        </Cell>
                        {customColumnsActive.map((column) => (
                          <Cell key={column} className="small">
                            {CUSTOM_COLUMNS[column].render(item)}
                          </Cell>
                        ))}
                        <Cell pinRight>
                          <ViewMarket
                            marketData={marketData}
                            item={item}
                            isExpanded={expandedMarketIds.includes(
                              item.id
                            )}
                            onOpen={handleDropdownOpen}
                            onClose={handleExpand}
                          />
                        </Cell>
                      </Row>

                      {marketData?.isFetched &&
                        expandedMarketIds.includes(item.id) && (
                          <MarketsTable
                            data={{
                              nodes: marketData?.data.tickers || [],
                            }}
                            customColumnsActive={customColumnsActive}
                          />
                        )}
                    </React.Fragment>
                  );
                })}
              </Body>
            </>
          )}
        </Table>
      </div>

      {fetchState.isLoading && <Loading />}
      {fetchState.isOverlayLoading && <OverlayLoading />}

      <TablePagination
        count={
          isWatchlistActive ? data.nodes.length : 9688 // TODO API does not offer this number
        }
        page={pagination.state.page}
        rowsPerPage={pagination.state.size}
        rowsPerPageOptions={
          activeCategory === DEFAULT_CATEGORY
            ? [10, 25, 50, 100]
            : [50]
        } // TODO
        onRowsPerPageChange={(event) =>
          pagination.fns.onSetSize(parseInt(event.target.value, 10))
        }
        onPageChange={(event, page) => pagination.fns.onSetPage(page)}
      />

      <Menu
        anchorEl={isDropdownOpen?.element}
        open={!!isDropdownOpen}
        onClose={handleDropdownClose}
        onClick={handleDropdownClose}
      >
        <MenuItem onClick={() => handleExpand()}>
          View Markets
        </MenuItem>
      </Menu>
    </div>
  );
};

export const CoinMarketCap = () => (
  <TableThemeProvider>
    <QueryClientProvider client={queryClient}>
      <CoinsTable />
    </QueryClientProvider>
  </TableThemeProvider>
);
