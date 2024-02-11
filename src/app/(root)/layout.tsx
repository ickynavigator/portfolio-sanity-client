import '@mantine/carousel/styles.css';
import '@mantine/core/styles.css';

import { Container, Stack } from '@mantine/core';
import { Metadata, ResolvingMetadata } from 'next';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import { ProfileDetails } from '~/groq/queries';
import { getConfig } from '~/lib/project.config';
import { urlForImage } from '~/sanity/sanity.lib';
import { getClient } from '~/sanity/sanity.server';
import { PersonalInfo } from '~/schema';

interface PersonalInfoResponse extends PersonalInfo {}

export async function generateMetadata(
  _: undefined,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const client = getClient();
  const data = await client.fetch<PersonalInfoResponse>(ProfileDetails);
  const projectConfig = await getConfig();

  const img = urlForImage(data.image);
  const ogImages = (await parent).openGraph?.images || [];
  const twitterImages = (await parent).twitter?.images || [];

  if (img) {
    const metaImg = { url: img, width: 160, height: 160, alt: data.title };

    ogImages.unshift(metaImg);
    twitterImages.unshift({ url: img, alt: data.title });
  }

  return {
    title: {
      template: `%s | ${projectConfig.name}'s Portfolio`,
      default: `${projectConfig.name}'s Portfolio`,
    },
    keywords: ['PORTFOLIO', 'DEVELOPER', 'NEXTJS', 'REACTJS', 'SANITY'],
    robots: 'index, follow',
    description: `${projectConfig.name}'s Portfolio. Built with Next.js and Sanity.`,
    creator: 'Obi Fortune',
    authors: [{ name: 'Obi Fortune', url: 'https://obifortune.com' }],
    openGraph: {
      type: 'website',
      title: {
        template: `%s | ${projectConfig.name}'s Portfolio`,
        default: `${projectConfig.name}'s Portfolio`,
      },
      description: `${projectConfig.name}'s Portfolio. Built with Next.js and Sanity.`,
      url: `/`,
      images: ogImages,
    },
    twitter: {
      card: 'player',
      title: {
        template: `%s | ${projectConfig.name}'s Portfolio`,
        default: `${projectConfig.name}'s Portfolio`,
      },
      description: `${projectConfig.name}'s Portfolio. Built with Next.js and Sanity.`,
      creator: '@obifortunebleh',
      creatorId: '1467726470533754880',
      site: `/`,
      images: twitterImages,
    },
  };
}

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const projectConfig = await getConfig();

  return (
    <Stack h="100%" justify="space-between" align="center">
      <Header projectConfig={projectConfig} />

      <Container w="100%">{children}</Container>

      <Footer />
    </Stack>
  );
};

export default Layout;
