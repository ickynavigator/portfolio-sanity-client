import {
  Box,
  Button,
  Card,
  CardSection,
  Center,
  Image,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { Metadata } from 'next';
import NextImage from 'next/image';
import Link from 'next/link';
import { AllCertificates } from '~/groq/queries';
import { formatDate } from '~/lib/format';
import { urlForImage } from '~/sanity/sanity.lib';
import { getClient } from '~/sanity/sanity.server';

export const metadata: Metadata = {
  title: 'All Certificates',
};

const Page = async () => {
  const client = getClient();
  const certificates = await client.fetch(AllCertificates);

  const picSize = { width: 150, height: 150 };

  return (
    <Center>
      <Stack w="fit-content">
        {certificates.map(
          ({
            _id,
            idx,
            name,
            authorityName,
            authorityImage,
            startDate,
            endDate,
            certificateLink,
            certificateHide,
          }) => {
            const sDate = startDate ? formatDate(startDate) : 'UNAVAILABLE';
            const eDate = endDate
              ? formatDate(endDate ?? '')
              : 'No Expiration Date';

            return (
              !certificateHide && (
                <Card shadow="sm" padding="sm" radius="md" withBorder key={_id}>
                  <Stack align="center" gap="xl">
                    {authorityImage && (
                      <CardSection>
                        <Paper
                          withBorder
                          radius="md"
                          style={{ overflow: 'hidden' }}
                        >
                          <Image
                            src={urlForImage(authorityImage)}
                            alt={name}
                            component={NextImage}
                            priority
                            {...picSize}
                          />
                        </Paper>
                      </CardSection>
                    )}
                    <Box>
                      <Stack gap="0" align="center">
                        <Title order={2}>{name}</Title>
                        <Title order={3}>Issued by {authorityName}</Title>
                        <Text>Credential Id : {idx}</Text>
                        {(startDate || endDate) && (
                          <Text>{`Issued on ${sDate} - ${eDate}`}</Text>
                        )}
                      </Stack>

                      {certificateLink && (
                        <Button
                          component={Link}
                          href={certificateLink}
                          passHref
                          target="_blank"
                          variant="outline"
                          fullWidth
                          mt="md"
                          radius="md"
                        >
                          View Certificate
                        </Button>
                      )}
                    </Box>
                  </Stack>
                </Card>
              )
            );
          },
        )}
      </Stack>
    </Center>
  );
};

export default Page;
