import '@mantine/carousel/styles.css';
import '@mantine/core/styles.css';

import { Container, Stack } from '@mantine/core';
import { Metadata } from 'next';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import projectConfig from '~/lib/project.config';

export const metadata: Metadata = {
  title: {
    template: `%s | ${projectConfig.name}'s Personal Portfolio`,
    default: `${projectConfig.name}'s Personal Portfolio`,
  },
  keywords: ['PORTFOLIO', 'DEVELOPER', 'NEXTJS', 'REACTJS', 'SANITY'],
  robots: 'index, follow',
  description: `${projectConfig.name}'s Personal Portfolio. Built with Next.js and Sanity.`,

  creator: 'Obi Fortune',
  authors: [{ name: 'Obi Fortune', url: 'https://obifortune.com' }],
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Stack h="100%" justify="space-between" align="center">
      <Header />

      <Container w="100%">{children}</Container>

      <Footer />
    </Stack>
  );
};

export default Layout;
