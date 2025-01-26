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
  const fetchProjectQuery = defineQuery(`*[_type == "project"] {
    "body": body,
    "title": name,
    "role": "Developer",
    "status": profileStatus,
    "archived": false,
    "hidden": projectHide,
    "description": name,
    "slug": slug.current,
    "tags": coalesce(categories[]->slug.current, []),
    "links": [
      select(projectUrl != null => {
        "display": "View Project",
        "url": projectUrl.url,
        "hidden": projectUrl.visibility,
      }),
      select(sourceUrl != null => {
        "display": "View Source",
        "url": sourceUrl.url,
        "hidden": sourceUrl.visibility,
      })
    ][@ != null],
    "images": projectImages[].asset->,
  }`);
  const documents = await client.fetch(fetchProjectQuery);

  await storeData(documents, 'project');

  return documents;
};

const main = async () => {
  console.log('Starting import...');

  await fetchAndStoreDocuments();

  console.log('Import Complete!');
};

main().catch((err: any) => {
  console.error(JSON.stringify(err, null, 2));

  process.exit(1);
});
