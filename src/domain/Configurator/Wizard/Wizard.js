import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';

import { ResizeConfigurator } from './ResizeConfigurator';
import { SortConfigurator } from './SortConfigurator';
import { SelectConfigurator } from './SelectConfigurator';
import { TreeConfigurator } from './TreeConfigurator';

const steps = {
  resize: {
    label: 'Resize',
    Content: ResizeConfigurator,
  },
  sort: {
    label: 'Sort',
    Content: SortConfigurator,
  },
  select: {
    label: 'Select',
    Content: SelectConfigurator,
  },
  tree: {
    label: 'Tree',
    Content: TreeConfigurator,
  },
};

const Wizard = ({ features, setFeatures }) => {
  const [activeStep, setActiveStep] = React.useState(
    Object.keys(steps)[0]
  );

  const { Content } = steps[activeStep];

  return (
    <Box sx={{ padding: '1rem', display: 'flex' }}>
      <div>
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

          <Step key="-1" disabled>
            <StepButton color="inherit">WIP (Beta)</StepButton>
          </Step>
          <Step key="-1" disabled>
            <StepButton color="inherit">WIP (Beta)</StepButton>
          </Step>
        </Stepper>
      </div>
      <Box sx={{ paddingLeft: '2rem' }}>
        <Content features={features} handleOptions={setFeatures} />
      </Box>
    </Box>
  );
};

export { Wizard };
