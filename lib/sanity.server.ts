// lib/sanity.server.js
import sanityClient from '@sanity/client';
import { createClient } from 'next-sanity';
import { config } from './config';

// Set up the client for fetching data in the getProps page functions
export const NextSanityClient = createClient(config);

// Set up a preview client with serverless authentication for drafts
export const previewClient = createClient({
  ...config,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Helper function for easily switching between normal client and preview client
export const getClient = () => {
  const usePreview = process.env.NODE_ENV !== 'production';

  return usePreview ? previewClient : NextSanityClient;
};

export const client = sanityClient(config);
