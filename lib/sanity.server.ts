// lib/sanity.server.js
import { createClient } from 'next-sanity';
import server from '../env/server.mjs';
import { config } from './sanity.config';

// Set up a preview client with serverless authentication for drafts
export const previewClient = createClient({
  ...config,
  useCdn: false,
  token: server.SANITY_API_TOKEN,
});

// Helper function for easily switching between normal client and preview client
export const getClient = () => {
  return previewClient;
};
