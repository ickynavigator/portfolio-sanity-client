import { createClient } from '@sanity-typed/next-sanity';
import type { SanityValues } from '../../sanity.config';
import server from '../env/server.mjs';
import { config } from './sanity.config';

/** Set up a preview client with serverless authentication for drafts */
export const previewClient = createClient<SanityValues>({
  projectId: config.projectId,
  dataset: config.dataset,
  apiVersion: config.apiVersion,
  useCdn: false,
  perspective: 'published',
  token: server.SANITY_API_TOKEN,
});

/** Helper function for easily switching between normal client and preview client */
export const getClient = () => {
  return previewClient;
};
