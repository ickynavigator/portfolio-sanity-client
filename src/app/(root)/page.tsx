import {
  Alert,
  Box,
  Button,
  ButtonGroup,
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
import CategoryList from '~/components/CategoryList';
import ClipboardButton from '~/components/Clipboard';
import EnhancedPortableText from '~/components/EnhancedPortableText';
import { ProfileDetails } from '~/groq/queries';
import { getBaseURL } from '~/lib/general';
import { getUrlFromId, urlForImage } from '~/sanity/sanity.lib';
import { getClient } from '~/sanity/sanity.server';
import { ProfileDetailsResult } from '~/schema';

const Page = async () => {
  const client = getClient();
  const data = await client.fetch<ProfileDetailsResult>(ProfileDetails);

  if (!data) {
    return null;
  }

  const { name, title, jobStatus, jobVisibility, CV, bio, skills } = data;

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
      <Center>
        <Image
          src={urlForImage(data?.image)}
          alt={name}
          component={NextImage}
          priority
          radius="50%"
          w={picSize.width}
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
        <Alert color={jobStatusCheck.color} radius="xl" fz="sm" p="xs">
          <Center>
            <Group>
              <Text size="sm">{jobStatusCheck.message}</Text>
              {jobStatusCheck.icon}
            </Group>
          </Center>
        </Alert>
      )}
      <Center w="100%">
        <Box w="100%">
          <Title order={2} mb="sm" ta="right">
            Bio
          </Title>
          <EnhancedPortableText value={bio} />

          {CV?.asset?._ref && (
            <ButtonGroup mt="md">
              <Button
                component="a"
                href={getUrlFromId(CV.asset._ref)}
                target="_blank"
                leftSection={<IconFileDownload size={16} />}
                variant="outline"
              >
                Download my CV
              </Button>

              <ClipboardButton
                text={`${getBaseURL().toString()}/cv`}
                tooltip="Copy link to URL"
                size={16}
              />
            </ButtonGroup>
          )}

          {skills != null && skills.length > 0 && (
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
