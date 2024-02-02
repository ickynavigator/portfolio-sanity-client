import { Carousel, CarouselSlide } from '@mantine/carousel';
import {
  ActionIcon,
  Alert,
  Anchor,
  Box,
  Card,
  CardSection,
  Center,
  Group,
  Image,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import {
  IconCheck,
  IconDeviceLaptop,
  IconHourglassLow,
  IconLink,
  IconX,
} from '@tabler/icons-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import CategoryList from '~/components/CategoryList';
import EnhancedPortableText from '~/components/EnhancedPortableText';
import { AllProjectDetails } from '~/groq/queries';
import { urlForImage } from '~/sanity/sanity.lib';
import { getClient } from '~/sanity/sanity.server';
import { Category, Project } from '~/schema';

interface _ProjectResponse extends Project {
  tags: Category[];
}
type ProjectResponse = Array<_ProjectResponse>;

export const metadata: Metadata = {
  title: 'All Projects',
};

const Page = async () => {
  const client = getClient();
  const projects = await client.fetch<ProjectResponse>(AllProjectDetails);

  return (
    <Box>
      <Stack>
        {projects.map(data => {
          const {
            name,
            _id,
            sourceUrl,
            projectUrl,
            body,
            profileStatus,
            projectIssuer,
            projectImage,
            tags,
          } = data;

          const buttonDetails = [
            {
              tip: 'Source Code',
              icon: <IconDeviceLaptop />,
              url: sourceUrl?.url,
              visibility: sourceUrl?.visibility,
            },
            {
              tip: 'Live Project',
              icon: <IconLink />,
              url: projectUrl?.url,
              visibility: projectUrl?.visibility,
            },
          ];
          const profileStatusIcon = (() => {
            switch (profileStatus) {
              case 'ongoing':
                return {
                  icon: <IconHourglassLow />,
                  color: 'yellow',
                };
              case 'abandoned':
                return {
                  icon: <IconX />,
                  color: 'red',
                };
              case 'completed':
              default:
                return {
                  icon: <IconCheck />,
                  color: 'green',
                };
            }
          })();

          return (
            <Card
              shadow="sm"
              padding="sm"
              radius="md"
              pt="0"
              withBorder
              key={_id}
            >
              <Stack>
                <CardSection>
                  <Carousel withControls={false}>
                    {[projectImage].map((i, ind) =>
                      i ? (
                        <CarouselSlide key={i.asset._ref}>
                          <Image
                            src={urlForImage(i)}
                            alt={`${name} - ${ind}`}
                            width="100%"
                          />
                        </CarouselSlide>
                      ) : null,
                    )}
                  </Carousel>
                </CardSection>

                <Stack>
                  <Title order={3}>{name}</Title>

                  <Box>
                    <EnhancedPortableText value={body} />
                  </Box>

                  <Group gap="sm">
                    <CategoryList tags={tags} />
                  </Group>

                  {projectIssuer && (
                    <Alert color="gray" radius="md">
                      <Center>
                        <Group gap="xs">
                          Project comissioned by:
                          {projectIssuer.link ? (
                            <Anchor component={Link} href={projectIssuer.link}>
                              <Text>{projectIssuer.name}</Text>
                            </Anchor>
                          ) : (
                            <Text>{projectIssuer.name}</Text>
                          )}
                        </Group>
                      </Center>
                    </Alert>
                  )}
                  <Alert color={profileStatusIcon.color} radius="md">
                    <Center>
                      <Group>
                        {profileStatusIcon.icon}
                        <Text tt="capitalize">{profileStatus}</Text>
                      </Group>
                    </Center>
                  </Alert>

                  <Group justify="space-between">
                    {buttonDetails.map(({ tip, icon, url, visibility }) => {
                      const shouldShow = !visibility && url;

                      const label = `${tip}${
                        shouldShow ? '' : ' - Link Unavailable'
                      }`;
                      const inner = (
                        <ActionIcon disabled={!shouldShow} variant="subtle">
                          {icon}
                        </ActionIcon>
                      );
                      return (
                        <Tooltip label={label} key={`${_id}-${tip}`} withArrow>
                          {shouldShow ? (
                            <Anchor
                              component={Link}
                              href={url}
                              passHref
                              key={url}
                              target="_blank"
                              aria-label={`${name} ${tip}`}
                            >
                              {inner}
                            </Anchor>
                          ) : (
                            inner
                          )}
                        </Tooltip>
                      );
                    })}
                  </Group>
                </Stack>
              </Stack>
            </Card>
          );
        })}
      </Stack>
    </Box>
  );
};

export default Page;
