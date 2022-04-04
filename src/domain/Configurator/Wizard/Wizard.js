import * as React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import StepButton from '@mui/material/StepButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';

import { AlignCenter } from 'domain/Tables/shared';

const steps = {
  resize: {
    label: 'Resize',
    description: 'Do you want resizable columns?',
    Content: ({ features, handleOptions }) => (
      <>
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
        </FormGroup>
      </>
    ),
  },
  sort: {
    label: 'Sort',
    description: 'Do you want to sort by column?',
    Content: ({ features, handleOptions }) => (
      <>
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
        </FormGroup>
      </>
    ),
  },
  select: {
    label: 'Select',
    description: 'Do you want selectable rows?',
    Content: ({ features, handleOptions }) => (
      <>
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
                checked={
                  !!features.select.hasInitialStateSingleSelect
                }
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
                      allSingleSelect:
                        !features.select.allSingleSelect,
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
        </FormGroup>
      </>
    ),
  },
  tree: {
    label: 'Tree',
    description: 'Should your table have a tree view?',
    Content: ({ features, handleOptions }) => (
      <>
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
        </FormGroup>
      </>
    ),
  },
};

const Wizard = ({ features, setFeatures }) => {
  const [activeStep, setActiveStep] = React.useState(
    Object.keys(steps)[0]
  );
  const [completed, setCompleted] = React.useState({});

  const { description, Content } = steps[activeStep];

  return (
    <Box sx={{ padding: '1rem', display: 'flex' }}>
      <Stepper
        orientation="vertical"
        nonLinear
        activeStep={Object.keys(steps).findIndex(
          (key) => activeStep === key
        )}
        sx={{ overflowY: 'auto' }}
      >
        {Object.keys(steps).map((key) => (
          <Step key={key} completed={features[key].enabled}>
            <StepButton
              color="inherit"
              onClick={() => setActiveStep(key)}
            >
              {steps[key].label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ paddingLeft: '2rem' }}>
        {/* <p style={{ display: 'flex', justifyContent: 'center' }}>
          {description}
        </p> */}
        <div>
          <Content features={features} handleOptions={setFeatures} />
        </div>
      </Box>
    </Box>
  );
};

export { Wizard };
