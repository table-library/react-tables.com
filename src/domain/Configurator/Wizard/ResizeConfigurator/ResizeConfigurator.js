import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';

import { AlignCenter } from 'domain/Tables/shared';

const ResizeConfigurator = ({ features, handleOptions }) => (
  <FormGroup>
    <FormControlLabel
      control={
        <Switch
          checked={!!features.resize.enabled}
          onChange={() =>
            handleOptions({
              ...features,
              resize: {
                enabled: !features.resize.enabled,
              },
            })
          }
        />
      }
      label="Enable Resize"
    />
    <small>... explore more options in the docs.</small>
  </FormGroup>
);

export { ResizeConfigurator };
