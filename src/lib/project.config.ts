import { groq } from 'next-sanity';
import { ProjectConfig } from '~/groq/queries';
import { getClient } from '~/sanity/sanity.server';
import { Configuration } from '~/schema';

export const getConfig = async () => {
  return getClient().fetch<Configuration>(ProjectConfig);
};

export const isProjectSetup = async () => {
  const client = getClient();
  const projectConfig = await client.fetch<{ name: string } | null>(
    groq`*[_type == 'configuration'][0]{name}`,
  );
  const projectInfo = await client.fetch<{ name: string } | null>(
    groq`*[_type == 'personalInfo'][0]{name}`,
  );

  return projectConfig !== null && projectInfo !== null;
};

export default {};
