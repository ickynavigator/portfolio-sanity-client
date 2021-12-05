import React from 'react';
import type { AppProps } from 'next/app';

import '../styles/globals.css';
// import '../styles/neo.scss';
import '../styles/myStyles.scss';
import Layout from '../components/Layout';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Layout {...pageProps}>
    <Component {...pageProps} />
  </Layout>
);

export default MyApp;
