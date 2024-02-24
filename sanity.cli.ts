import { loadEnvConfig } from '@next/env';
import { defineCliConfig } from 'sanity/cli';

loadEnvConfig(__dirname, process.env.NODE_ENV !== 'production', {
  info: () => null,
  error: console.error,
});

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export default defineCliConfig({ api: { projectId, dataset } });
