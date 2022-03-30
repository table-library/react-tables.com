import * as React from 'react';
import styled from '@emotion/styled';
import SelectBase from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { AlignCenter, Ellipse } from '../shared';

export const Absolute = styled.div`
  position: absolute;

  z-index: 5;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const BlurryOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  top: 0;
  left: 0;

  background: var(--theme-ui-colors-background);
  filter: opacity(0.8);

  z-index: 10;
`;

export const OverlayLoading = () => (
  <>
    <BlurryOverlay />
    <Absolute>
      <CircularProgress />
    </Absolute>
  </>
);

export const Relative = styled.div`
  height: 556px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Loading = () => (
  <Relative>
    <CircularProgress />
  </Relative>
);

export const Select = styled(SelectBase)`
  font-size: 12px;

  & .MuiSelect-select {
    padding-left: 0;
  }

  & .MuiOutlinedInput-notchedOutline {
    border: none;
  }
`;

export const Indicator = ({ prefix = '', value, suffix = '' }) => {
  const isPositive = value > 0;

  return (
    <AlignCenter
      style={{
        color: isPositive
          ? 'var(--theme-ui-colors-success)'
          : 'var(--theme-ui-colors-error)',
      }}
    >
      {prefix}
      {isPositive ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}&nbsp;
      <Ellipse>
        {value.toString().replace('-', '')}
        {suffix}
      </Ellipse>
    </AlignCenter>
  );
};
