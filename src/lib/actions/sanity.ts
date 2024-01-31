'use server';

import { SanityDocumentStub } from 'next-sanity';
import { getClient } from '~/lib/sanity.server';
import { ContactForms } from '~/schema';

export const postToSanity = async <
  D extends SanityDocumentStub<Record<string, any>> = any,
>(
  data: D,
) => {
  const dryRun = process.env.NODE_ENV !== 'production';

  const client = getClient();
  const result = await client.create<D>(data, { dryRun });

  return result;
};

export const createContactMessage = async (data: DeEnhanced<ContactForms>) => {
  return postToSanity(data);
};
