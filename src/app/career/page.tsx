import {
  Card,
  Divider,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { Metadata } from 'next';
import NextImage from 'next/image';
import CategoryList from '~/components/CategoryList';
import EnhancedPortableText from '~/components/EnhancedPortableText';
import { AllCareers } from '~/groq/queries';
import { formatDate } from '~/lib/format';
import { urlFor } from '~/lib/sanity';
import { getClient } from '~/lib/sanity.server';
import { Career, Category } from '~/schema';
import classes from './page.module.css';

interface _CareerResponse extends Career {
  tags: Category[];
}
type CareerResponse = Array<_CareerResponse>;

export const metadata: Metadata = {
  title: 'All Careers',
};

const Page = async () => {
  const client = getClient();
  const careers = await client.fetch<CareerResponse>(AllCareers);

  const imageSize = { width: 80, height: 80 };

  return (
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
            <Stack gap={0} my="md">
              <Group
                justify="space-between"
                align="flex-start"
                className={classes.group}
              >
                <Stack gap={0} mb="md">
                  <Title order={3}>{name}</Title>
                  <Title order={4} c="dimmed">
                    {title}
                  </Title>
                  <Text>
                    {employmentType} - {locationType}{' '}
                    {location ? `- ${location}` : ``}
                  </Text>
                  <Text>
                    {formatDate(startDate)} -{' '}
                    {endDate ? formatDate(endDate) : 'Present'}
                  </Text>
                </Stack>

                {companyLogo && (
                  <Paper withBorder radius="md" style={{ overflow: 'hidden' }}>
                    <Image
                      src={urlFor(companyLogo)}
                      alt={`Logo for ${name}`}
                      component={NextImage}
                      {...imageSize}
                    />
                  </Paper>
                )}
              </Group>

              <Divider />

              <EnhancedPortableText value={description} />

              <Divider />

              <Group gap="sm" mt="md">
                <CategoryList tags={tags} />
              </Group>
            </Stack>
          </Card>
        );
      })}
    </Stack>
  );
};

export default Page;
