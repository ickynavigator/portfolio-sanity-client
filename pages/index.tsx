import { Alert, Center, Group, Stack, Text, Title } from '@mantine/core';
import type { NextPage } from 'next';
import Image from 'next/image';
import { FaCheck, FaHourglassHalf, FaTimes } from 'react-icons/fa';
import MetaHead from '../components/MetaHead';
import { ProfileDetails } from '../groq/queries';
import { urlFor } from '../lib/sanity';
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
  const { name, title, jobStatus, image, jobVisibility } = data;

  const picSize = { width: 160, height: 160 };
  const jobStatusCheck = (() => {
    let message: string;
    let color: string;
    let icon: JSX.Element;

    switch (jobStatus) {
      case 'inbetween':
        message = 'Kind of available at the moment';
        color = 'yellow';
        icon = <FaHourglassHalf />;
        break;
      case 'close':
        message = 'Not available for hire at the moment';
        color = 'red';
        icon = <FaTimes />;
        break;
      case 'open':
      default:
        message = 'Available for hire';
        color = 'green';
        icon = <FaCheck />;
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

        <Title order={1}>{name}</Title>
        <Title order={2} c="dimmed">
          {title}
        </Title>
        {jobVisibility && (
          <>
            <Title order={3} c="dimmed">
              Job Status
            </Title>
            <Alert color={jobStatusCheck.color}>
              <Center>
                <Group>
                  {jobStatusCheck.icon}
                  <Text>{jobStatusCheck.message}</Text>
                </Group>
              </Center>
            </Alert>
          </>
        )}
      </Stack>
    </>
  );
};

export default Home;
