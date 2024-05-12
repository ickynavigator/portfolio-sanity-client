import '@mantine/core/styles.css';

import './layout.styles.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import theme from '~/lib/mantine.config';
import { ViewTransitions } from 'next-view-transitions';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ViewTransitions>
      <html lang="en">
        <head>
          <ColorSchemeScript defaultColorScheme="auto" />
          <link rel="shortcut icon" href="/favicon.ico" />
        </head>

        <body>
          <MantineProvider defaultColorScheme="auto" theme={theme}>
            {children}
          </MantineProvider>
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </ViewTransitions>
  );
};

export default RootLayout;
