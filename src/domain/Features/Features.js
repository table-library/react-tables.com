import React from 'react';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import TableChartIcon from '@mui/icons-material/TableChart';
import HeightIcon from '@mui/icons-material/Height';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ExpandIcon from '@mui/icons-material/Expand';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import BoltIcon from '@mui/icons-material/Bolt';
import EditIcon from '@mui/icons-material/Edit';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';

import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview,
} from 'react-live';
import nightOwl from 'prism-react-renderer/themes/nightOwl';

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

import { Grid, GridItem } from 'components/Grid';

import { nodes } from '../data';
import { THEME } from '../theme';

const code = `
() => {
  const data = { nodes };

  const theme = useTheme(THEME);

  return (
    <Table data={data} theme={theme}>
      {(tableList) => (
        <>
          <Header>
            <HeaderRow>
              <HeaderCell>Task</HeaderCell>
              <HeaderCell>Deadline</HeaderCell>
              <HeaderCell>Type</HeaderCell>
              <HeaderCell>Complete</HeaderCell>
              <HeaderCell>Tasks</HeaderCell>
            </HeaderRow>
          </Header>

          <Body>
            {tableList.map((item) => (
              <Row key={item.id} item={item}>
                <Cell>{item.name}</Cell>
                <Cell>
                  {item.deadline.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })}
                </Cell>
                <Cell>{item.type}</Cell>
                <Cell>{item.isComplete.toString()}</Cell>
                <Cell>{item.nodes ? item.nodes.length : ''}</Cell>
              </Row>
            ))}
          </Body>
        </>
      )}
    </Table>
  );
};
`;

const Features = () => {
  return (
    <>
      <Grid width="900px">
        <GridItem>
          <DarkModeIcon />
          Theming
        </GridItem>
        <GridItem>
          <TableChartIcon />
          Layout
        </GridItem>
        <GridItem rotate>
          <HeightIcon />
          Resize
        </GridItem>
        <GridItem>
          <SortByAlphaIcon />
          Sort
        </GridItem>
        <GridItem>
          <SearchIcon />
          Search
        </GridItem>
        <GridItem>
          <FilterAltIcon />
          Filter
        </GridItem>
        <GridItem>
          <CheckBoxIcon />
          Select
        </GridItem>
        <GridItem>
          <AccountTreeIcon />
          Tree
        </GridItem>
        <GridItem>
          <ExpandIcon />
          Expand
        </GridItem>
        <GridItem>
          <AutoStoriesIcon />
          Pagination
        </GridItem>
        <GridItem>
          <GpsFixedIcon />
          Fixed Header
        </GridItem>
        <GridItem>
          <ViewColumnIcon />
          Fixed Column
        </GridItem>
        <GridItem>
          <BoltIcon />
          Virtualized
        </GridItem>
        <GridItem>
          <EditIcon />
          Editable
        </GridItem>
        <GridItem>
          <DashboardCustomizeIcon />
          Column Hiding
        </GridItem>
        <GridItem rotate>
          <MoveDownIcon />
          Column Ordering
        </GridItem>
        <GridItem>
          <BackupTableIcon />
          CSV Download
        </GridItem>
        <GridItem>
          <PictureAsPdfIcon />
          PDF Download
        </GridItem>
        <GridItem>
          <ImageIcon />
          Image Download
        </GridItem>
      </Grid>

      {/* <div className="react-live" style={{ display: 'flex' }}>
        <LiveProvider
          theme={nightOwl}
          code={code}
          scope={{
            nodes,
            THEME,
            useTheme,

            Table,
            Header,
            HeaderRow,
            Body,
            Row,
            HeaderCell,
            Cell,
          }}
        >
          <LiveEditor
            style={{
              backgroundColor: 'rgba(12,10,29,1.0)',
              border: '1px solid #515151',
              borderRight: '1px solid transparent',
              fontSize: '12px',
              overflow: 'auto',
              height: '255px',
              width: '50%',
            }}
          />
          <LiveError />
          <LivePreview
            style={{
              width: '50%',
            }}
          />
        </LiveProvider>
      </div> */}
    </>
  );
};

export { Features };
