import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';

import { AlignCenter } from 'domain/Tables/shared';

const TreeConfigurator = ({ features, handleOptions }) => (
  <FormGroup>
    <FormControlLabel
      control={
        <Switch
          checked={!!features.tree.enabled}
          onChange={() =>
            handleOptions({
              ...features,
              tree: {
                enabled: !features.tree.enabled,
              },
            })
          }
        />
      }
      label="Enable Tree"
    />
    <FormControlLabel
      control={
        <Switch
          disabled={!features.tree.enabled}
          checked={!!features.tree.hasInitialState}
          onChange={() =>
            handleOptions({
              ...features,
              tree: {
                ...features.tree,
                hasInitialState: !features.tree.hasInitialState,
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
          disabled={!features.tree.enabled}
          checked={!!features.tree.hasCallbackHandler}
          onChange={() =>
            handleOptions({
              ...features,
              tree: {
                ...features.tree,
                hasCallbackHandler: !features.tree.hasCallbackHandler,
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
          disabled={!features.tree.enabled}
          checked={!!features.tree.expandOnlyIcon}
          onChange={() =>
            handleOptions({
              ...features,
              tree: {
                ...features.tree,
                expandOnlyIcon: !features.tree.expandOnlyIcon,
              },
            })
          }
        />
      }
      label={
        <AlignCenter>
          Expand Tree on Icon click only&nbsp;
          <Tooltip title="Disables tree expand on row click.">
            <InfoIcon fontSize="small" />
          </Tooltip>
        </AlignCenter>
      }
    />
    <FormControlLabel
      control={
        <Switch
          disabled={!features.tree.enabled}
          checked={!!features.tree.treeColumn}
          onChange={() =>
            handleOptions({
              ...features,
              tree: {
                ...features.tree,
                treeColumn: !features.tree.treeColumn,
              },
            })
          }
        />
      }
      label={
        <AlignCenter>
          Use other Column as Tree&nbsp;
          <Tooltip title="Choose which column you want to show the tree icon.">
            <InfoIcon fontSize="small" />
          </Tooltip>
        </AlignCenter>
      }
    />
    <FormControlLabel
      control={
        <Switch
          disabled={!features.tree.enabled}
          checked={!!features.tree.thirdParty}
          onChange={() =>
            handleOptions({
              ...features,
              tree: {
                ...features.tree,
                thirdParty: !features.tree.thirdParty,
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

export { TreeConfigurator };
