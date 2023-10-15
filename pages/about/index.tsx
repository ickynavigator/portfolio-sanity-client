import { Badge, Box, Button, Center, Group, Title } from '@mantine/core';
import { PortableText } from '@portabletext/react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { FaFileDownload } from 'react-icons/fa';
import MetaHead from '../../components/MetaHead';
import { AboutMeDetails } from '../../groq/queries';
import { getUrlFromId } from '../../lib/sanity';
import { getClient } from '../../lib/sanity.server';
import { Category, PersonalInfo } from '../../schema';

export const getStaticProps = async () => {
  const details = await getClient().fetch<
    PersonalInfo & { skills: Category[] }
  >(AboutMeDetails);
  return { props: { details } };
};

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type Props = UnwrapPromise<ReturnType<typeof getStaticProps>>['props'];

const index: NextPage<Props> = props => {
  const { details } = props;
  const { bio, CV, skills } = details;

  return (
    <>
      <MetaHead title="About Me" />

      <Center>
        <Box>
          <Title order={2} mb="sm" align="right">
            Bio
          </Title>
          <PortableText value={bio} />

          {CV?.asset._ref && (
            <Button
              component={Link}
              href={getUrlFromId(CV.asset._ref)}
              passHref
              leftIcon={<FaFileDownload className="mr-1" />}
              variant="outline"
              color="gray"
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
                {skills.map(tag => {
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
            </>
          )}
        </Box>
      </Center>
    </>
  );
};

export default index;
