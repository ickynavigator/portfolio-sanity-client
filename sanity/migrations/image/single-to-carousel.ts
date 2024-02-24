import { nanoid } from 'nanoid';
import createClient from '../client';
import { Project } from '../../../schema';

const client = createClient();

const fetchDocuments = () => {
  return client.fetch<Project[]>(`*[_type == "project"]`);
};

const migrateBatch = async () => {
  const documents = await fetchDocuments();
  if (documents.length === 0) {
    console.warn('No documents to convert!');
    return null;
  }

  const mutations = documents.map(doc => {
    // eslint-disable-next-line no-console
    console.info(`Migrating document - id: ${doc._id}`);

    return {
      id: doc._id,
      patch: {
        id: doc._id,
        set: {
          projectImages: doc?.projectImage
            ? [{ ...doc.projectImage, _key: nanoid() }]
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

  // eslint-disable-next-line no-console
  console.log('Migration complete!');

  return null;
};

migrateBatch().catch((err: any) => {
  console.error(JSON.stringify(err, null, 2));

  process.exit(1);
});
