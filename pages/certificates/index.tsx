import { Box, Button, Card, Center, Stack, Text, Title } from '@mantine/core';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Certificate as CertificateTypes } from '../../schema';
import MetaHead from '../../src/components/MetaHead';
import { AllCertificates } from '../../src/groq/queries';
import { urlFor } from '../../src/lib/sanity';
import { getClient } from '../../src/lib/sanity.server';

export const getStaticProps = async () => {
  const certificates = await getClient().fetch<CertificateTypes[]>(
    AllCertificates,
  );
  return { props: { certificates } };
};

const dateHelper = (date: Date) => {
  return Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  }).format(date);
};

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type Props = UnwrapPromise<ReturnType<typeof getStaticProps>>['props'];
const index: NextPage<Props> = props => {
  const { certificates } = props;
  const picSize = { width: 150, height: 150 };

  return (
    <>
      <MetaHead title="All Certificates" />
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
              const sDate = startDate
                ? dateHelper(new Date(startDate))
                : 'UNAVAILABLE';
              const eDate = endDate
                ? dateHelper(new Date(endDate ?? ''))
                : 'No Expiration Date';

              return (
                !certificateHide && (
                  <Card
                    shadow="sm"
                    padding="sm"
                    radius="md"
                    withBorder
                    key={_id}
                  >
                    <Stack align="center" spacing="xl">
                      {authorityImage && (
                        <Card.Section>
                          <Image
                            src={urlFor(authorityImage)}
                            alt={name}
                            priority
                            {...picSize}
                          />
                        </Card.Section>
                      )}
                      <Box>
                        <Stack spacing="0" align="center">
                          <Title order={3}>{name}</Title>
                          <Title order={4}>Issued by {authorityName}</Title>
                          <Text c="dimmed">Credential Id : {idx}</Text>
                          {(startDate || endDate) && (
                            <Text c="dimmed">
                              {`Issued on ${sDate} - ${eDate}`}
                            </Text>
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
    </>
  );
};

export default index;
