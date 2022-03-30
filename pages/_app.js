// see https://github.com/mui/material-ui/blob/master/examples/nextjs/pages/_app.js

import * as React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import {
  ThemeProvider as DarkLightThemes,
  useTheme as useDarkLightTheme,
} from 'next-themes';

import '../styles/globals.scss';

import { createEmotionCache } from '../src/util/emotion';

const getMaterialTheme = (theme) =>
  createTheme({
    palette: {
      mode: theme,
    },
  });

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const MaterialTheme = ({ children }) => {
  const [mounted, setMounted] = React.useState(false);
  const { theme } = useDarkLightTheme();

  // When mounted on client, now we can show the UI
  React.useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <ThemeProvider theme={getMaterialTheme(theme)}>
      {children}
      <CssBaseline />
    </ThemeProvider>
  );
};

const MyApp = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) => {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <DarkLightThemes defaultTheme="dark">
        <MaterialTheme>
          <Component {...pageProps} />
        </MaterialTheme>
      </DarkLightThemes>
    </CacheProvider>
  );
};

export default MyApp;
