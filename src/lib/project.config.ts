import {
  ProjectConfig,
  ProjectConfigName,
  ProjectInfoName,
} from '~/groq/queries';
import { getClient } from '~/sanity/sanity.server';

export const getConfig = async () => {
  return getClient().fetch(ProjectConfig);
};

export const isProjectSetup = async () => {
  const client = getClient();
  const projectConfig = await client.fetch(ProjectConfigName);
  const projectInfo = await client.fetch(ProjectInfoName);

  return projectConfig !== null && projectInfo !== null;
};
