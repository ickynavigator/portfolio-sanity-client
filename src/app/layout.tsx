import '@mantine/carousel/styles.css';
import '@mantine/core/styles.css';

import './layout.styles.css';

import {
  ColorSchemeScript,
  Container,
  MantineProvider,
  Stack,
} from '@mantine/core';
import { Metadata, Viewport } from 'next';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import theme from '~/lib/mantine.config';
import projectConfig from '~/lib/project.config';

export const metadata: Metadata = {
  title: {
    template: `%s | ${projectConfig.name} Personal Portfolio`,
    default: `${projectConfig.name} Personal Portfolio`,
  },
  keywords: ['PORTFOLIO', 'DEVELOPER', 'NEXTJS', 'REACTJS', 'SANITY'],
  robots: 'index, follow',
  description: `${projectConfig.name}'s Personal Portfolio. Built with Next.js and Sanity.`,

  creator: 'Obi Fortune',
  authors: [{ name: 'Obi Fortune', url: 'https://obifortune.com' }],
};

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
        <MantineProvider theme={theme}>
          <Stack h="100%" justify="space-between" align="center">
            <Header />

            <Container w="100%">{children}</Container>

            <Footer />
          </Stack>
        </MantineProvider>
      </body>
    </html>
  );
};

export default RootLayout;
