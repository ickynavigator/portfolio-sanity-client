import { ProjectConfig } from '~/groq/queries';
import { getClient } from '~/sanity/sanity.server';
import { Configuration } from '~/schema';

export const getConfig = async () => {
  const client = getClient();
  const projectConfig = await client.fetch<Configuration>(ProjectConfig);

  return projectConfig;
};

export default {};
