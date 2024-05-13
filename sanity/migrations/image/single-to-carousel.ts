/* eslint-disable no-console */
import { groq } from 'next-sanity';
import createClient from '../client';
import { FetchDocumentsQueryResult } from '../../../sanity.d';

const client = createClient();

const fetchDocuments = () => {
  const fetchDocumentsQuery = groq`*[_type == "project"]`;
  return client.fetch<FetchDocumentsQueryResult>(fetchDocumentsQuery);
};

const migrateBatch = async () => {
  const documents = await fetchDocuments();
  if (documents.length === 0) {
    console.warn('No documents to convert!');
    return;
  }

  const mutations = documents.map(doc => {
    console.info(`Migrating document - id: ${doc._id}`);

    return {
      id: doc._id,
      patch: {
        id: doc._id,
        set: {
          projectImages: doc?.projectImage
            ? [{ ...doc.projectImage, _key: crypto.randomUUID() }]
            : [],
        },
        unset: ['projectImage'],
      },
    };
  });

  const transactions = mutations.reduce((tx, mutation) => {
    return tx.patch(mutation.id, mutation.patch);
  }, client.transaction());

  await transactions.commit();

  console.log('Migration complete!');
};

migrateBatch().catch((err: any) => {
  console.error(JSON.stringify(err, null, 2));

  process.exit(1);
});
