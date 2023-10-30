import { Carousel } from '@mantine/carousel';
import {
  ActionIcon,
  Alert,
  Anchor,
  Badge,
  Box,
  Card,
  Center,
  Group,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { PortableText } from '@portabletext/react';
import {
  IconCheck,
  IconDeviceLaptop,
  IconHourglassLow,
  IconLink,
  IconX,
} from '@tabler/icons-react';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import MetaHead from '../../components/MetaHead';
import { AllProjectDetails } from '../../groq/queries';
import { urlFor } from '../../lib/sanity';
import { getClient } from '../../lib/sanity.server';
import { Category, Project as ProjectTypes } from '../../schema';

export const getStaticProps = async () => {
  const projects = await getClient().fetch<
    Array<ProjectTypes & { tags: Category[] }>
  >(AllProjectDetails);
  return { props: { projects } };
};

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type Props = UnwrapPromise<ReturnType<typeof getStaticProps>>['props'];

const Index: NextPage<Props> = props => {
  const { projects } = props;

  const picSize = { width: 1000, height: 600 };

  return (
    <>
      <MetaHead title="All Projects" />
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
                  <Card.Section>
                    <Carousel withControls={false}>
                      {[projectImage].map((i, ind) =>
                        i ? (
                          <Carousel.Slide key={i.asset._ref}>
                            <Image
                              src={urlFor(i)}
                              alt={`${name} - ${ind}`}
                              priority
                              {...picSize}
                            />
                          </Carousel.Slide>
                        ) : null,
                      )}
                    </Carousel>
                  </Card.Section>

                  <Stack>
                    <Title order={3}>{name}</Title>

                    <Box>
                      <PortableText value={body} />
                    </Box>

                    <Group spacing="sm">
                      {tags.map(tag => {
                        return (
                          <Badge
                            variant="outline"
                            key={tag._id}
                            color="gray"
                            size="lg"
                          >
                            {tag.title}
                          </Badge>
                        );
                      })}
                    </Group>

                    {projectIssuer && (
                      <Alert color="gray" radius="md">
                        <Center>
                          <Group spacing="xs">
                            Project comissioned by:
                            {projectIssuer.link ? (
                              <Anchor
                                component={Link}
                                href={projectIssuer.link}
                              >
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

                    <Group position="apart">
                      {buttonDetails.map(({ tip, icon, url, visibility }) => {
                        const shouldShow = !visibility && url;

                        const inner = (
                          <ActionIcon variant="outline" disabled={!shouldShow}>
                            {icon}
                          </ActionIcon>
                        );
                        return (
                          <Tooltip
                            label={`${tip}${
                              shouldShow ? '' : ' - Link Unavailable'
                            }`}
                            key={`${_id}-${tip}`}
                          >
                            {shouldShow ? (
                              <Link
                                href={url}
                                passHref
                                key={url}
                                target="_blank"
                                aria-label={`${name} ${tip}`}
                              >
                                {inner}
                              </Link>
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
    </>
  );
};

export default Index;
