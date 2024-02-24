import { createClient } from '@sanity/client';

const token = process.env.SANITY_API_TOKEN;
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2023-03-01';

const getMigrationClient = () => {
  const client = createClient({
    apiVersion,
    projectId,
    dataset,
    token,
    useCdn: false,
  });

  return client;
};

export default getMigrationClient;
