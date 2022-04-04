import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';

import { AlignCenter } from 'domain/Tables/shared';

const SortConfigurator = ({ features, handleOptions }) => (
  <FormGroup>
    <FormControlLabel
      control={
        <Switch
          checked={!!features.sort.enabled}
          onChange={() =>
            handleOptions({
              ...features,
              sort: {
                enabled: !features.sort.enabled,
              },
            })
          }
        />
      }
      label="Enable Sort"
    />
    <FormControlLabel
      control={
        <Switch
          disabled={!features.sort.enabled}
          checked={!!features.sort.hasInitialState}
          onChange={() =>
            handleOptions({
              ...features,
              sort: {
                ...features.sort,
                hasInitialState: !features.sort.hasInitialState,
              },
            })
          }
        />
      }
      label="Implement Initial State"
    />
    <FormControlLabel
      control={
        <Switch
          disabled={!features.sort.enabled}
          checked={!!features.sort.hasCallbackHandler}
          onChange={() =>
            handleOptions({
              ...features,
              sort: {
                ...features.sort,
                hasCallbackHandler: !features.sort.hasCallbackHandler,
              },
            })
          }
        />
      }
      label="Implement Callback Handler"
    />
    <FormControlLabel
      control={
        <Switch
          disabled={!features.sort.enabled}
          checked={!!features.sort.thirdParty}
          onChange={() =>
            handleOptions({
              ...features,
              sort: {
                ...features.sort,
                thirdParty: !features.sort.thirdParty,
              },
            })
          }
        />
      }
      label={
        <AlignCenter>
          Use third-party Icon&nbsp;
          <Tooltip title="Do not use the built-in icon, but a third-party Icon component (e.g. Icon component from a UI library).">
            <InfoIcon fontSize="small" />
          </Tooltip>
        </AlignCenter>
      }
    />
    <small>... explore more options in the docs.</small>
  </FormGroup>
);

export { SortConfigurator };
