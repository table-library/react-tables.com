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

import { Grid, GridItem } from 'components/Grid';

const Features = () => {
  return (
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
  );
};

export { Features };
