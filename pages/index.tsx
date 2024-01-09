import {
  Alert,
  Box,
  Button,
  Center,
  Group,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import {
  IconCheck,
  IconFileDownload,
  IconHourglassLow,
  IconX,
} from '@tabler/icons-react';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import CategoryList from '../components/CategoryList';
import EnhancedPortableText from '../components/EnhancedPortableText';
import MetaHead from '../components/MetaHead';
import { ProfileDetails } from '../groq/queries';
import { getUrlFromId, urlFor } from '../lib/sanity';
import { getClient } from '../lib/sanity.server';
import { Category, PersonalInfo } from '../schema.d';

interface PersonalInfoResponse extends PersonalInfo {
  skills: Category[];
}

export const getStaticProps = async () => {
  const data: PersonalInfoResponse = await getClient().fetch(ProfileDetails);

  return { props: { data: { ...data } } };
};

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type Props = UnwrapPromise<ReturnType<typeof getStaticProps>>['props'];

const Home: NextPage<Props> = props => {
  const { data } = props;
  const { name, title, jobStatus, image, jobVisibility, CV, bio, skills } =
    data;

  const picSize = { width: 160, height: 160 };
  const jobStatusCheck = (() => {
    let message: string;
    let color: string;
    let icon: JSX.Element;

    switch (jobStatus) {
      case 'inbetween':
        message = 'Kind of available at the moment';
        color = 'yellow';
        icon = <IconHourglassLow />;
        break;
      case 'close':
        message = 'Not available for hire at the moment';
        color = 'red';
        icon = <IconX />;
        break;
      case 'open':
      default:
        message = 'Available for hire';
        color = 'green';
        icon = <IconCheck />;
        break;
    }

    return { message, color, icon };
  })();

  return (
    <>
      <MetaHead title="Home" />
      <Stack align="center" spacing="xs">
        <Center
          sx={{
            overflow: 'hidden',
            borderRadius: '50%',
          }}
        >
          <Image src={urlFor(image)} alt={name} priority {...picSize} />
        </Center>

        <Title order={1} align="center">
          {name}
        </Title>
        <Title order={2} align="center" c="dimmed">
          {title}
        </Title>
        {jobVisibility && (
          <>
            <Title order={3} align="center" c="dimmed">
              Job Status
            </Title>
            <Alert color={jobStatusCheck.color} radius="xl">
              <Center>
                <Group>
                  <Text>{jobStatusCheck.message}</Text>
                  {jobStatusCheck.icon}
                </Group>
              </Center>
            </Alert>
          </>
        )}
        <Center>
          <Box>
            <Title order={2} mb="sm" align="right">
              Bio
            </Title>
            <EnhancedPortableText value={bio} />

            {CV?.asset._ref && (
              <Button
                component={Link}
                href={getUrlFromId(CV.asset._ref)}
                passHref
                target="_blank"
                leftIcon={<IconFileDownload className="mr-1" />}
                variant="outline"
                mt="sm"
              >
                Download my CV
              </Button>
            )}

            {skills.length > 0 && (
              <>
                <Title order={2} mb="sm" align="right">
                  Skills
                </Title>

                <Group spacing="sm">
                  <CategoryList tags={skills} />
                </Group>
              </>
            )}
          </Box>
        </Center>
      </Stack>
    </>
  );
};

export default Home;
