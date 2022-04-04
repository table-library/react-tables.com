import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';

import { AlignCenter } from 'domain/Tables/shared';

const SelectConfigurator = ({ features, handleOptions }) => (
  <FormGroup>
    <FormControlLabel
      control={
        <Switch
          checked={!!features.select.enabled}
          onChange={() =>
            handleOptions({
              ...features,
              select: {
                enabled: !features.select.enabled,
              },
            })
          }
        />
      }
      label="Enable Select"
    />
    <FormControlLabel
      control={
        <Switch
          disabled={!features.select.enabled}
          checked={!!features.select.checkbox}
          onChange={() =>
            handleOptions({
              ...features,
              select: {
                ...features.select,
                checkbox: !features.select.checkbox,
              },
            })
          }
        />
      }
      label="Add Checkbox Column"
    />
    <FormControlLabel
      control={
        <Switch
          disabled={!features.select.enabled}
          checked={!!features.select.hasInitialStateSingleSelect}
          onChange={() =>
            handleOptions({
              ...features,
              select: {
                ...features.select,
                hasInitialStateMultiSelect: false,
                hasInitialStateSingleSelect:
                  !features.select.hasInitialStateSingleSelect,
              },
            })
          }
        />
      }
      label="Implement Initial State (Single Select)"
    />
    <FormControlLabel
      control={
        <Switch
          disabled={!features.select.enabled}
          checked={!!features.select.hasInitialStateMultiSelect}
          onChange={() =>
            handleOptions({
              ...features,
              select: {
                ...features.select,
                hasInitialStateSingleSelect: false,
                hasInitialStateMultiSelect:
                  !features.select.hasInitialStateMultiSelect,
              },
            })
          }
        />
      }
      label="Implement Initial State (Multi Select)"
    />
    <FormControlLabel
      control={
        <Switch
          disabled={!features.select.enabled}
          checked={!!features.select.hasCallbackHandler}
          onChange={() =>
            handleOptions({
              ...features,
              select: {
                ...features.select,
                hasCallbackHandler:
                  !features.select.hasCallbackHandler,
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
          disabled={!features.select.enabled}
          checked={!!features.select.selectOnlyCheckbox}
          onChange={() =>
            handleOptions({
              ...features,
              select: {
                ...features.select,
                checkbox: !features.select.selectOnlyCheckbox
                  ? true
                  : features.select.checkbox,
                selectOnlyCheckbox:
                  !features.select.selectOnlyCheckbox,
              },
            })
          }
        />
      }
      label={
        <AlignCenter>
          Select only on Checkbox&nbsp;
          <Tooltip title="Disables row select.">
            <InfoIcon fontSize="small" />
          </Tooltip>
        </AlignCenter>
      }
    />
    <FormControlLabel
      control={
        <Switch
          disabled={!features.select.enabled}
          checked={!!features.select.allSingleSelect}
          onChange={() =>
            handleOptions({
              ...features,
              select: {
                ...features.select,
                allSingleSelect: !features.select.allSingleSelect,
                allMultiSelect: false,
              },
            })
          }
        />
      }
      label={
        <AlignCenter>
          All Single Select&nbsp;
          <Tooltip title="Choose whether every checkbox and row click should result in a single select. The default is multi select on a checkbox click and single select on a row click.">
            <InfoIcon fontSize="small" />
          </Tooltip>
        </AlignCenter>
      }
    />
    <FormControlLabel
      control={
        <Switch
          disabled={!features.select.enabled}
          checked={!!features.select.allMultiSelect}
          onChange={() =>
            handleOptions({
              ...features,
              select: {
                ...features.select,
                allSingleSelect: false,
                allMultiSelect: !features.select.allMultiSelect,
              },
            })
          }
        />
      }
      label={
        <AlignCenter>
          All Multi Select&nbsp;
          <Tooltip title="Choose whether every checkbox and row click should result in a multi select. The default is multi select on a checkbox click and single select on a row click.">
            <InfoIcon fontSize="small" />
          </Tooltip>
        </AlignCenter>
      }
    />
    <FormControlLabel
      control={
        <Switch
          disabled={!features.select.enabled}
          checked={!!features.select.thirdParty}
          onChange={() =>
            handleOptions({
              ...features,
              select: {
                ...features.select,
                checkbox: !features.select.thirdParty
                  ? true
                  : features.select.checkbox,
                thirdParty: !features.select.thirdParty,
              },
            })
          }
        />
      }
      label={
        <AlignCenter>
          Use third-party Checkbox&nbsp;
          <Tooltip title="Do not use the built-in checkbox, but a third-party Checkbox component (e.g. Checkbox component from a UI library).">
            <InfoIcon fontSize="small" />
          </Tooltip>
        </AlignCenter>
      }
    />
    <small>... explore more options in the docs.</small>
  </FormGroup>
);

export { SelectConfigurator };
