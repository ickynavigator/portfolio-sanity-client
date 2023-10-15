import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { getCookie, setCookie } from 'cookies-next';
import type { AppContext, AppProps } from 'next/app';
import NextApp from 'next/app';
import { useState } from 'react';

import Layout from '../components/Layout';
import RouterTransition from '../components/RouterTransition';
import MantineConfig from '../lib/mantine.config';
import '../styles/globals.css';

type Props = AppProps & {
  colorScheme: ColorScheme;
};

const App = (props: Props) => {
  const { Component, pageProps, colorScheme: _colorScheme } = props;

  const [colorScheme, setColorScheme] = useState<ColorScheme>(_colorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === 'dark' ? 'light' : 'dark');

    setColorScheme(nextColorScheme);

    // when color scheme is updated save it to cookie
    setCookie('mantine-color-scheme', nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
  };

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ ...MantineConfig, colorScheme }}
      >
        <RouterTransition />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);

  return {
    ...appProps,
    colorScheme: getCookie('mantine-color-scheme', appContext.ctx) || 'dark',
  };
};

export default App;
