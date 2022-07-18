import * as React from 'react';

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
import { getTheme } from '@table-library/react-table-library/baseline';
import {
  useTree,
  CellTree,
} from '@table-library/react-table-library/tree';

const nodes = [
  {
    id: '1',
    name: 'Project A',
    dates: [
      {
        label: 'Task A.1',
        start: new Date(new Date().setDate(new Date().getDate() + 2)),
        end: new Date(new Date().setDate(new Date().getDate() + 4)),
      },
      {
        label: 'Task A.2',
        start: new Date(new Date().setDate(new Date().getDate() + 5)),
        end: new Date(new Date().setDate(new Date().getDate() + 8)),
      },
      {
        label: 'Task A.3',
        start: new Date(new Date().setDate(new Date().getDate() + 9)),
        end: new Date(new Date().setDate(new Date().getDate() + 12)),
      },
    ],
    nodes: [
      {
        id: '3',
        name: 'Project C',
        dates: [
          {
            label: 'Task C.1',
            start: new Date(
              new Date().setDate(new Date().getDate() + 3)
            ),
            end: new Date(
              new Date().setDate(new Date().getDate() + 6)
            ),
          },
          {
            label: 'Task C.2',
            start: new Date(
              new Date().setDate(new Date().getDate() + 8)
            ),
            end: new Date(
              new Date().setDate(new Date().getDate() + 10)
            ),
          },
        ],
      },
    ],
  },
  {
    id: '4',
    name: 'Project D',
    dates: [
      {
        label: 'Task D.1',
        start: new Date(new Date().setDate(new Date().getDate() + 6)),
        end: new Date(new Date().setDate(new Date().getDate() + 8)),
      },
      {
        label: 'Task D.2',
        start: new Date(new Date().setDate(new Date().getDate() + 9)),
        end: new Date(new Date().setDate(new Date().getDate() + 12)),
      },
      {
        label: 'Task D.3',
        start: new Date(
          new Date().setDate(new Date().getDate() + 14)
        ),
        end: new Date(new Date().setDate(new Date().getDate() + 16)),
      },
    ],
    nodes: [
      {
        id: '5',
        name: 'Project E',
        dates: [
          {
            label: 'Task E.1',
            start: new Date(
              new Date().setDate(new Date().getDate() + 2)
            ),
            end: new Date(
              new Date().setDate(new Date().getDate() + 4)
            ),
          },
          {
            label: 'Task E.2',
            start: new Date(
              new Date().setDate(new Date().getDate() + 7)
            ),
            end: new Date(
              new Date().setDate(new Date().getDate() + 12)
            ),
          },
        ],
      },
    ],
  },
  {
    id: '42',
    name: 'Project Z',
    dates: [
      {
        label: 'Task Z.1',
        start: new Date(new Date().setDate(new Date().getDate() + 1)),
        end: new Date(new Date().setDate(new Date().getDate() + 3)),
      },
      {
        label: 'Task Z.2',
        start: new Date(new Date().setDate(new Date().getDate() + 4)),
        end: new Date(new Date().setDate(new Date().getDate() + 5)),
      },
    ],
  },
];

const dayColumns = Array.from(
  { length: 18 },
  (_, i) => new Date(new Date().setDate(new Date().getDate() + i + 1))
);

// https://stackoverflow.com/a/6117889/1189762
const getWeekNumber = (d) => {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return weekNo;
};

const weekColumns = dayColumns.reduce((acc, value) => {
  const week = getWeekNumber(value);

  if (!acc[week]) {
    acc[week] = { value: week, colSpan: 1 };
  } else {
    acc[week] = { ...acc[week], colSpan: acc[week].colSpan + 1 };
  }

  return acc;
}, {});

const MS_PER_DAY = 1000 * 60 * 60 * 24;

const diffInDays = (a, b) => {
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / MS_PER_DAY);
};

const CUSTOM_THEME = {
  Table: `
    --data-table-library_grid-template-columns: 10% 10% repeat(${dayColumns.length}, minmax(80px, 1fr));
  `,
  BaseRow: `
    background-color: var(--theme-ui-colors-background);
  `,
  HeaderRow: `
    font-size: 12px;
    color: var(--theme-ui-colors-text);

    &:first-of-type {
      .th {
        border-top: 1px solid var(--theme-ui-colors-border);
      }
    }

    .th {
      border-bottom: 1px solid var(--theme-ui-colors-border);
    }
  `,
  Row: `
    font-size: 14px;
    color: var(--theme-ui-colors-text);

    &:hover {
      color: var(--theme-ui-colors-text);
    }
  `,
  BaseCell: `
    padding: 8px;

    &.center {
      text-align: center;
    }

    &:nth-of-type(1) {
      left: 0;
    }

    &:nth-of-type(2) {
      left: 10%;
    }

    border-left: 1px solid var(--theme-ui-colors-border);

    &:nth-of-type(1) {
      border-left: 1px solid transparent;
      border-right: 1px solid var(--theme-ui-colors-border);
    }

    &:nth-of-type(2) {
      border-left: 1px solid transparent;
      border-right: 1px solid var(--theme-ui-colors-border);
    }

    &:nth-of-type(3) {
      border-left: 1px solid transparent;
    }

    svg, path {
      fill: var(--theme-ui-colors-text);
      stroke: var(--theme-ui-colors-text);
    }
  `,
};

const GanttCell = ({ date, dates, colSpan = 0 }) => {
  const item = dates.find(
    (value) => value.start.getTime() === date.getTime()
  );

  const ganttStyle = {
    // position: 'relative',
    // zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    color: 'var(--theme-ui-colors-background-secondary)',
    padding: '0 4px',
    backgroundColor: `var(--theme-ui-colors-success)`,
    height: '32px',
  };

  return (
    <div
      style={{
        height: '100%',
      }}
    >
      <div style={item ? ganttStyle : {}}>
        {item ? item.label : ''}
      </div>
      {/* not used here, because left does not work ... */}
      {/* but the solution not showing borders has something to it too */}
      {Array.from({ length: colSpan - 1 }, (_, i) => (
        <div
          style={{
            height: '100%',
            position: 'absolute',
            top: 0,
            // left: `${79 * (i + 1) + i}px`,
            left: `calc(${(100 / colSpan) * (i + 1)}% - 1px)`,
            // width: '1px',
            backgroundColor: 'var(--theme-ui-colors-border)',
          }}
        />
      ))}
    </div>
  );
};

const Gantt = () => {
  const data = { nodes };

  const theme = useTheme(CUSTOM_THEME);

  const tree = useTree(
    data,
    {
      onChange: onTreeChange,
    },
    {
      treeIcon: {
        size: '10px',
      },
    }
  );

  function onTreeChange(action, state) {
    console.log(action, state);
  }

  const FIXED_COLUMN_COUNT = 2;

  return (
    <Table
      data={data}
      theme={theme}
      layout={{ custom: true, horizontalScroll: true }}
      tree={tree}
    >
      {(tableList) => (
        <>
          <Header>
            <HeaderRow>
              <HeaderCell
                pinLeft
                style={{ gridRowStart: 1, gridRowEnd: 3 }}
              >
                Project
              </HeaderCell>
              <HeaderCell
                pinLeft
                className="center"
                style={{ gridRowStart: 1, gridRowEnd: 3 }}
              >
                Duration
              </HeaderCell>
              {Object.values(weekColumns).map((date, index) => (
                <HeaderCell
                  key={index}
                  className="center"
                  includePreviousColSpan
                  gridColumnStart={FIXED_COLUMN_COUNT + index + 1}
                  gridColumnEnd={
                    FIXED_COLUMN_COUNT + index + date.colSpan + 1
                  }
                  colSpan={date.colSpan}
                >
                  Week {date.value}
                </HeaderCell>
              ))}
            </HeaderRow>
            <HeaderRow>
              {dayColumns.map((date, index) => (
                <HeaderCell key={index} className="center">
                  {date.toLocaleDateString('en-US', {
                    month: '2-digit',
                    day: '2-digit',
                  })}
                </HeaderCell>
              ))}
            </HeaderRow>
          </Header>

          <Body>
            {tableList.map((item) => (
              <Row key={item.id} item={item}>
                <CellTree item={item} pinLeft>
                  {item.name}
                </CellTree>
                <Cell pinLeft className="center">
                  {item.dates.reduce(
                    (acc, value) =>
                      acc + diffInDays(value.start, value.end) + 1,
                    0
                  )}
                </Cell>
                {dayColumns
                  .filter((date) => {
                    const isMiddle = item.dates.some(
                      (value) =>
                        value.start.getTime() < date.getTime() &&
                        value.end.getTime() > date.getTime()
                    );

                    const isEnd = item.dates.some(
                      (value) =>
                        value.end.getTime() === date.getTime()
                    );

                    return !isMiddle && !isEnd;
                  })
                  .map((date, index) => {
                    const value = item.dates.find(
                      (value) =>
                        value.start.getTime() === date.getTime()
                    );

                    let extraProps = {};
                    if (value) {
                      const start = FIXED_COLUMN_COUNT + index + 1;
                      const end =
                        start +
                        diffInDays(value.start, value.end) +
                        1;

                      extraProps = {
                        ...extraProps,
                        includePreviousColSpan: true,
                        gridColumnStart: start,
                        gridColumnEnd: end,
                      };
                    }

                    return (
                      <Cell
                        key={index}
                        {...extraProps}
                        // style={{ position: 'relative' }}
                      >
                        <GanttCell
                          date={date}
                          dates={item.dates}
                          {...extraProps}
                        />
                      </Cell>
                    );
                  })}
              </Row>
            ))}
          </Body>
        </>
      )}
    </Table>
  );
};

export { Gantt };
