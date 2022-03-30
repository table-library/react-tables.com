// see https://github.com/mui/material-ui/blob/master/examples/nextjs/pages/_app.js

import * as React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';

import { createEmotionCache } from 'util/emotion';
import { useDarkMode, DarkModeProvider } from 'hooks/useDarkMode';

import 'styles/globals.scss';

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
  const { theme } = useDarkMode();

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
        <title>React Tables</title>
        <meta
          name="description"
          content="Awesome React Tables by React Table Library"
        />
        <meta name="robots" content="all,follow" />
        <meta
          name="googlebot"
          content="index,follow,snippet,archive"
        />
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
        <meta itemProp="name" content="React Tables" />
        <meta
          itemProp="description"
          content="Awesome React Tables by React Table Library"
        />
        <meta itemProp="image" content="/facebook.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@rwieruch" />
        <meta name="twitter:title" content="React Tables" />
        <meta
          name="twitter:description"
          content="Awesome React Tables by React Table Library"
        />
        <meta name="twitter:image:src" content="/twitter.png" />
        <meta name="twitter:image:alt" content="React Tables" />
        <meta name="og:site_name" content="React Tables" />
        <meta name="og:type" content="website" />
        <meta name="og:title" content="React Tables" />
        <meta
          name="og:description"
          content="Awesome React Tables by React Table Library"
        />
        <meta name="og:image" content="/facebook.png" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/favicon/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/favicon/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/favicon/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/favicon/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/favicon/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/favicon/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/favicon/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/favicon/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicon/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/manifest.json" />
        <meta name="msapplication-TileColor" content="#823eb7" />
        <meta
          name="msapplication-TileImage"
          content="/favicon/ms-icon-144x144.png"
        />
        <meta name="theme-color" content="#823eb7" />
      </Head>
      <DarkModeProvider>
        <MaterialTheme>
          <Component {...pageProps} />
        </MaterialTheme>
      </DarkModeProvider>
    </CacheProvider>
  );
};

export default MyApp;
