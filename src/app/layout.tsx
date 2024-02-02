import '@mantine/carousel/styles.css';
import '@mantine/core/styles.css';

import './layout.styles.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import theme from '~/lib/mantine.config';

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
