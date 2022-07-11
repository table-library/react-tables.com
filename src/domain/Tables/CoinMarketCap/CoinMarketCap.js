/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import {
  useQueries,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
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

import { useDarkMode } from 'hooks/useDarkMode';

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
  useCustom,
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
  WATCHLIST_CATEGORY,
} from './config';
import {
  CUSTOM_SHARED_THEME,
  CUSTOM_PRIMARY_THEME,
  CUSTOM_SECONDARY_THEME,
} from './theme';
import { queryCurrencies, queryMarkets } from './queries';
import { twoDecimals } from './util';
import { OverlayLoading, Loading, Select, Indicator } from './styles';

const queryClient = new QueryClient();

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

const MarketsTable = ({ data, hiddenColumns }) => {
  const { isLightMode } = useDarkMode();

  const theme = useTheme([
    CUSTOM_SHARED_THEME({ isLightMode }),
    CUSTOM_SECONDARY_THEME,
  ]);

  return (
    <Table data={data} theme={theme}>
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
              {Object.keys(CUSTOM_COLUMNS).map((column) => (
                <HeaderCell
                  key={column}
                  hide={hiddenColumns.includes(column)}
                />
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
                        style={{
                          color: 'var(--theme-ui-colors-success)',
                        }}
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
                            ? 'var(--theme-ui-colors-success)'
                            : 'var(--theme-ui-colors-error)',
                      }}
                      variant="outlined"
                    />
                  </Cell>
                  <Cell />
                  <Cell />
                  <Cell />
                  {Object.keys(CUSTOM_COLUMNS).map((column) => (
                    <Cell
                      key={column}
                      hide={hiddenColumns.includes(column)}
                      className="small"
                    />
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

const CoinsTable = () => {
  const { isLightMode } = useDarkMode();

  // box shadow hack for theme transition
  const [isLightModeFinished, setLightModeFinished] =
    React.useState(isLightMode);

  React.useEffect(() => {
    if (!isLightMode) {
      setLightModeFinished(false);
    } else {
      setTimeout(() => {
        setLightModeFinished(true);
      }, 0);
    }
  }, [isLightMode]);

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

  const [watched, setWatched] = useLocalStorageState('watched', {
    defaultValue: [],
  });

  // category

  const [activeCategory, setActiveCategory] =
    React.useState(DEFAULT_CATEGORY);

  // customize

  const [isCustomizeActive, setCustomizeActive] =
    React.useState(false);
  const [hiddenColumns, setHiddenColumns] = React.useState(
    Object.keys(CUSTOM_COLUMNS)
  );

  // theming

  const theme = useTheme([
    CUSTOM_SHARED_THEME({ isLightMode, isLightModeFinished }),
    CUSTOM_PRIMARY_THEME,
  ]);

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

  const data = {
    nodes:
      activeCategory === WATCHLIST_CATEGORY ? watched : currencies,
  };

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
      isServer: activeCategory === WATCHLIST_CATEGORY ? false : true,
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

  // activeCategory

  useCustom('activeCategory', data, {
    state: { activeCategory },
    onChange: onActiveCategoryChange,
  });

  function onActiveCategoryChange(action, state) {
    const size = state.activeCategory === DEFAULT_CATEGORY ? 10 : 50; // TODO

    pagination.fns.onSetPage(DEFAULT_PAGE);
    pagination.fns.onSetSize(size);

    fetchCurrencies(
      {
        page: DEFAULT_PAGE,
        size: size,
        category: state.activeCategory,
      },
      { overlayLoading: true }
    );
  }

  // watchlist handler

  const handleFavorite = (item) => {
    if (watched.map((value) => value.id).includes(item.id)) {
      setWatched(watched.filter((value) => value.id !== item.id));
    } else {
      setWatched(watched.concat(item));
    }
  };

  const handleWatchList = () => {
    pagination.fns.onSetPage(DEFAULT_PAGE);
    pagination.fns.onSetSize(DEFAULT_SIZE);

    setActiveCategory(WATCHLIST_CATEGORY);
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
        style={{
          borderBottom: '1px solid var(--theme-ui-colors-border)',
          overflowX: 'auto',
        }}
      >
        <Stack direction="row" spacing={1} m={1}>
          <Button
            color="secondary"
            size="small"
            variant={
              activeCategory === WATCHLIST_CATEGORY
                ? 'outlined'
                : 'text'
            }
            startIcon={
              activeCategory === WATCHLIST_CATEGORY ? (
                <StarIcon />
              ) : (
                <StarOutlineIcon />
              )
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
              color="secondary"
              size="small"
              variant={key === activeCategory ? 'outlined' : 'text'}
              onClick={() => setActiveCategory(key)}
            >
              {CATEGORIES[key].label}
            </Button>
          ))}
        </Stack>

        <Stack direction="row" spacing={1} m={1}>
          <Button
            color="secondary"
            size="small"
            variant={isCustomizeActive ? 'outlined' : 'text'}
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
          style={{
            borderBottom: '1px solid var(--theme-ui-colors-border)',
            overflowX: 'auto',
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            m={1}
          >
            <small style={{ textTransform: 'uppercase' }}>
              Add Columns:
            </small>

            {Object.keys(CUSTOM_COLUMNS).map((key) => (
              <Button
                key={key}
                color="secondary"
                size="small"
                variant={
                  hiddenColumns.includes(key) ? 'text' : 'outlined'
                }
                onClick={() =>
                  hiddenColumns.includes(key)
                    ? setHiddenColumns(
                        hiddenColumns.filter((value) => value !== key)
                      )
                    : setHiddenColumns(hiddenColumns.concat(key))
                }
              >
                {CUSTOM_COLUMNS[key].label}
              </Button>
            ))}
          </Stack>

          <Stack direction="row" spacing={1} m={1}>
            {hiddenColumns.length <
              Object.keys(CUSTOM_COLUMNS).length && (
              <Button
                color="secondary"
                size="small"
                onClick={() =>
                  setHiddenColumns(Object.keys(CUSTOM_COLUMNS))
                }
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
                    <Select
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
                    </Select>
                  </HeaderCell>
                  <HeaderCell resize>
                    <Select
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
                    </Select>
                  </HeaderCell>
                  <HeaderCell resize>Market Cap</HeaderCell>
                  <HeaderCell resize>Circulating Supply</HeaderCell>
                  <HeaderCell
                    resize={
                      hiddenColumns.length !==
                      Object.keys(CUSTOM_COLUMNS).length
                    }
                  >
                    Last 7 Days
                  </HeaderCell>
                  {Object.keys(CUSTOM_COLUMNS).map((column) => (
                    <HeaderCell
                      key={column}
                      resize
                      hide={hiddenColumns.includes(column)}
                      className="small"
                    >
                      <AlignCenter>
                        {CUSTOM_COLUMNS[column].label}&nbsp;
                        <IconButton
                          size="small"
                          onClick={() =>
                            setHiddenColumns(
                              hiddenColumns.concat(column)
                            )
                          }
                        >
                          <CloseIcon />
                        </IconButton>
                      </AlignCenter>
                    </HeaderCell>
                  ))}
                  <HeaderCell pinRight stiff />
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
                              {watched
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
                            <SparklinesLine color="var(--theme-ui-colors-success)" />
                          </Sparklines>
                        </Cell>
                        {Object.keys(CUSTOM_COLUMNS).map((column) => (
                          <Cell
                            key={column}
                            hide={hiddenColumns.includes(column)}
                            className="small"
                          >
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
                            hiddenColumns={hiddenColumns}
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
          activeCategory === WATCHLIST_CATEGORY
            ? data.nodes.length
            : 9688 // TODO API does not offer this number
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
