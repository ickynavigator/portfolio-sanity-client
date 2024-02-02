import {
  Alert,
  Box,
  Button,
  Center,
  Group,
  Image,
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
import NextImage from 'next/image';
import Link from 'next/link';
import CategoryList from '~/components/CategoryList';
import EnhancedPortableText from '~/components/EnhancedPortableText';
import { ProfileDetails } from '~/groq/queries';
import { getUrlFromId, urlForImage } from '~/sanity/sanity.lib';
import { getClient } from '~/sanity/sanity.server';
import { Category, PersonalInfo } from '~/schema';

interface PersonalInfoResponse extends PersonalInfo {
  skills: Category[];
}

const Page = async () => {
  const client = getClient();
  const data = await client.fetch<PersonalInfoResponse>(ProfileDetails);

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
    <Stack align="center" gap="xs">
      <Center style={{ overflow: 'hidden', borderRadius: '50%' }}>
        <Image
          src={urlForImage(image)}
          alt={name}
          component={NextImage}
          {...picSize}
        />
      </Center>

      <Title order={1} ta="center">
        {name}
      </Title>
      <Title order={2} ta="center" c="dimmed">
        {title}
      </Title>
      {jobVisibility && (
        <>
          <Title order={3} ta="center" c="dimmed">
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
          <Title order={2} mb="sm" ta="right">
            Bio
          </Title>
          <EnhancedPortableText value={bio} />

          {CV?.asset._ref && (
            <Button
              component={Link}
              href={getUrlFromId(CV.asset._ref)}
              passHref
              target="_blank"
              leftSection={<IconFileDownload className="mr-1" />}
              variant="outline"
              mt="sm"
            >
              Download my CV
            </Button>
          )}

          {skills.length > 0 && (
            <>
              <Title order={2} mb="sm" ta="right">
                Skills
              </Title>

              <Group gap="sm">
                <CategoryList tags={skills} />
              </Group>
            </>
          )}
        </Box>
      </Center>
    </Stack>
  );
};

export default Page;
