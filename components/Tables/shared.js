import styled from '@emotion/styled';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ThemeEscape = styled.div`
  p {
    margin: 0;
  }
`;

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const TableThemeProvider = ({ children }) => (
  <ThemeEscape>
    <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
  </ThemeEscape>
);

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
