import { loadEnvConfig } from '@next/env';
import { defineCliConfig } from 'sanity/cli';

loadEnvConfig(__dirname, process.env.NODE_ENV !== 'production', {
  info: () => null,
  error: console.error,
});

const { default: env } = await import('~/env/client.mjs');
const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = env.NEXT_PUBLIC_SANITY_DATASET;

export default defineCliConfig({ api: { projectId, dataset } });
