/* eslint-disable no-console */
import { defineQuery } from 'next-sanity';
import fs from 'fs/promises';
import path from 'path';
import createClient from '../../client';

const client = createClient();

const storeData = async (data: unknown, prefix: string) => {
  await fs.writeFile(
    path.join(__dirname, `${prefix}-documents.json`),
    JSON.stringify(data, null, 2),
  );
};

const fetchAndStoreDocuments = async () => {
  const fetchProjectQuery = defineQuery(`*[_type == "project"]`);
  const documents = await client.fetch(fetchProjectQuery);

  await storeData(documents, 'project');

  return documents;
};

const fetchAndStoreDerefedCategories = async () => {
  const fetchCategoriesQuery = defineQuery(`*[_type == "category"]`);
  const categories = await client.fetch(fetchCategoriesQuery);

  await storeData(categories, 'category');

  return categories;
};

const main = async () => {
  console.log('Starting import...');

  await fetchAndStoreDocuments();
  await fetchAndStoreDerefedCategories();

  console.log('Import Complete!');
};

main().catch((err: any) => {
  console.error(JSON.stringify(err, null, 2));

  process.exit(1);
});
