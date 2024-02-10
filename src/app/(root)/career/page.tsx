import {
  Box,
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
import { urlForImage } from '~/sanity/sanity.lib';
import { getClient } from '~/sanity/sanity.server';
import { Career, Category } from '~/schema';
import classes from './page.module.css';

interface _CareerResponse extends Career {
  tags: Category[];
}
type CareerResponse = Array<_CareerResponse> | null;

export const metadata: Metadata = {
  title: 'All Careers',
};

const Page = async () => {
  const client = getClient();
  const careers = await client.fetch<CareerResponse>(AllCareers);

  const imageSize = { width: 80, height: 80 };

  return (
    <Stack>
      {careers?.map(data => {
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
            <Stack gap="sm" my="md">
              <Group
                justify="space-between"
                align="flex-start"
                className={classes.group}
              >
                <Box>
                  <Title order={2}>{name}</Title>
                  <Title order={3}>{title}</Title>
                  <Text>
                    {employmentType} - {locationType}{' '}
                    {location ? `- ${location}` : ``}
                  </Text>
                  <Text>
                    {formatDate(startDate)} -{' '}
                    {endDate ? formatDate(endDate) : 'Present'}
                  </Text>
                </Box>

                {companyLogo && (
                  <Paper withBorder radius="md" style={{ overflow: 'hidden' }}>
                    <Image
                      src={urlForImage(companyLogo)}
                      alt={`Logo for ${name}`}
                      component={NextImage}
                      priority
                      {...imageSize}
                    />
                  </Paper>
                )}
              </Group>

              <Divider />

              <EnhancedPortableText value={description} />

              <Divider />

              <Group gap="sm">
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
