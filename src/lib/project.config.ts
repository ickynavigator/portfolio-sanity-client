import {
  ProjectConfig,
  ProjectConfigName,
  ProjectInfoName,
} from '~/groq/queries';
import { getClient } from '~/sanity/sanity.server';
import {
  ProjectConfigNameResult,
  ProjectConfigResult,
  ProjectInfoNameResult,
} from '~/schema';

export const getConfig = async () => {
  return getClient().fetch<ProjectConfigResult>(ProjectConfig);
};

export const isProjectSetup = async () => {
  const client = getClient();
  const projectConfig =
    await client.fetch<ProjectConfigNameResult>(ProjectConfigName);
  const projectInfo =
    await client.fetch<ProjectInfoNameResult>(ProjectInfoName);

  return projectConfig !== null && projectInfo !== null;
};
