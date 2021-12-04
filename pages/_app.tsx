import React from 'react';
import type { AppProps } from 'next/app';

import '../styles/globals.css';
// import '../styles/neo.scss';
import '../styles/myStyles.scss';
import Header from '../components/Header';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <div className="w-screen h-screen p-6">
    <Header />
    <div className="flex">
      <Component {...pageProps} />
    </div>
  </div>
);

export default MyApp;
