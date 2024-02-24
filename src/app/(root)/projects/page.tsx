import '@mantine/carousel/styles.css';

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
  Paper,
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
type ProjectResponse = Array<_ProjectResponse> | null;

export const metadata: Metadata = {
  title: 'All Projects',
};

const Page = async () => {
  const client = getClient();
  const projects = await client.fetch<ProjectResponse>(AllProjectDetails);

  return (
    <Box>
      <Stack>
        {projects?.map(data => {
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
                  icon: <IconHourglassLow size="1rem" />,
                  color: 'yellow',
                };
              case 'abandoned':
                return {
                  icon: <IconX size="1rem" />,
                  color: 'red',
                };
              case 'completed':
              default:
                return {
                  icon: <IconCheck size="1rem" />,
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
                  <Title order={2}>{name}</Title>

                  <Box>
                    <EnhancedPortableText value={body} />
                  </Box>

                  <Group gap="sm">
                    <CategoryList tags={tags} />
                  </Group>

                  {projectIssuer && (
                    <Paper radius="md" py="sm" fz="sm">
                      <Center>
                        <Group gap="xs">
                          Project comissioned by:
                          {projectIssuer.link ? (
                            <Anchor
                              component={Link}
                              href={projectIssuer.link}
                              td="underline"
                              size="sm"
                              fw="bold"
                              aria-label={`Go to project comissioner (${projectIssuer.name})`}
                            >
                              {projectIssuer.name}
                            </Anchor>
                          ) : (
                            <Text size="sm" fw="bold">
                              {projectIssuer.name}
                            </Text>
                          )}
                        </Group>
                      </Center>
                    </Paper>
                  )}
                  <Alert
                    color={profileStatusIcon.color}
                    radius="md"
                    py="sm"
                    fz="sm"
                  >
                    <Center>
                      <Group>
                        {profileStatusIcon.icon}
                        <Text tt="capitalize" size="sm">
                          {profileStatus}
                        </Text>
                      </Group>
                    </Center>
                  </Alert>

                  <Group justify="space-between">
                    {buttonDetails.map(({ tip, icon, url, visibility }) => {
                      const shouldShow = !visibility && url;
                      const link = shouldShow ? '' : ' - Link Unavailable';

                      const label = `${tip}${link}`;
                      const inner = (
                        <ActionIcon
                          disabled={!shouldShow}
                          variant="subtle"
                          aria-label={`${tip} link for ${name}`}
                        >
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
