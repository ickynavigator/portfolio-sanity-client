import {
  Badge,
  Card,
  Divider,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { PortableText } from '@portabletext/react';
import { InferGetStaticPropsType, NextPage } from 'next';
import MetaHead from '../../components/MetaHead';
import { AllCareers } from '../../groq/queries';
import { urlFor } from '../../lib/sanity';
import { getClient } from '../../lib/sanity.server';
import { Career as CareerType, Category } from '../../schema';

export const getStaticProps = async () => {
  const careers = await getClient().fetch<
    Array<CareerType & { tags: Category[] }>
  >(AllCareers);
  return { props: { careers } };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const dateHelper = (date: string) => {
  return Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
  }).format(new Date(date));
};

const Career: NextPage<Props> = props => {
  const { careers } = props;
  return (
    <>
      <MetaHead title="All Careers" />
      <Stack>
        {careers.map(data => {
          const {
            _id,
            name,
            description,
            title,
            location,
            locationType,
            employmentType,
            startDate,
            endDate,
            companyLogo,
            tags,
          } = data;

          return (
            <Card shadow="sm" padding="lg" radius="md" withBorder key={_id}>
              <Stack spacing={0} my="md">
                <Group
                  position="apart"
                  align="flex-start"
                  sx={{
                    '@media (max-width: 768px)': {
                      flexDirection: 'column-reverse',
                    },
                  }}
                >
                  <Stack spacing={0} mb="md">
                    <Title order={3}>{name}</Title>
                    <Title order={4} c="dimmed">
                      {title}
                    </Title>
                    <Text>
                      {employmentType} - {locationType}{' '}
                      {location ? `- ${location}` : ``}
                    </Text>
                    <Text>
                      {dateHelper(startDate)} -{' '}
                      {endDate ? dateHelper(endDate) : 'Present'}
                    </Text>
                  </Stack>

                  {companyLogo && (
                    <Paper withBorder radius="md" sx={{ overflow: 'hidden' }}>
                      <Image
                        src={urlFor(companyLogo)}
                        alt={`Logo for ${name}`}
                        width="80px"
                      />
                    </Paper>
                  )}
                </Group>
                <Divider />
                <PortableText value={description} />
                <Divider />
                <Group spacing="sm" mt="md">
                  {tags?.map(tag => {
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
              </Stack>
            </Card>
          );
        })}
      </Stack>
    </>
  );
};

export default Career;
