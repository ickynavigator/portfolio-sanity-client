import '@mantine/carousel/styles.css';
import '@mantine/core/styles.css';

import './layout.styles.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Viewport } from 'next';
import theme from '~/lib/mantine.config';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  userScalable: false,
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>

      <body>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
};

export default RootLayout;
