import * as React from 'react';
import styled from '@emotion/styled';

const ThemeEscape = styled.div`
  p {
    margin: 0;
  }
`;

export const TableThemeProvider = ({ theme, children }) => {
  return <ThemeEscape>{children}</ThemeEscape>;
};

export const AlignCenter = ({
  children,
  hasEllipse = false,
  spaceBetween = false,
  style = {},
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      ...(spaceBetween ? { justifyContent: 'space-between' } : {}),
      ...(hasEllipse ? { minWidth: 0 } : {}),
      ...style,
    }}
  >
    {children}
  </div>
);

export const Ellipse = ({ children, style = {}, ...rest }) => (
  <div
    style={{
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      ...style,
    }}
    {...rest}
  >
    {children}
  </div>
);
