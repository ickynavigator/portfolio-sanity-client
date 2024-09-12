import '@mantine/core/styles.css';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { PropsWithChildren } from 'react';

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>

      <body>
        {children}

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
