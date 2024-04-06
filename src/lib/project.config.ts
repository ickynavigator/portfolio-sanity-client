import {
  ProjectConfig,
  ProjectConfigName,
  ProjectInfoName,
} from '~/groq/queries';
import { getClient } from '~/sanity/sanity.server';
import { Configuration } from '~/schema';

export const getConfig = async () => {
  return getClient().fetch<Configuration>(ProjectConfig);
};

export const isProjectSetup = async () => {
  const client = getClient();
  const projectConfig = await client.fetch<{ name: string } | null>(
    ProjectConfigName,
  );
  const projectInfo = await client.fetch<{ name: string } | null>(
    ProjectInfoName,
  );

  return projectConfig !== null && projectInfo !== null;
};

export default {};
