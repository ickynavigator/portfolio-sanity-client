import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { vercelDeployTool } from 'sanity-plugin-vercel-deploy';
import { deskTool } from 'sanity/desk';
import { config } from '~/sanity/sanity.config';
import schema from '~/sanity/schemas';

const { apiVersion: defaultApiVersion, dataset, projectId } = config;
const sanityConfig = defineConfig({
  basePath: '/studio',
  name: 'portfolio',
  title: 'Portfolio',
  projectId,
  dataset,
  schema: {
    types: schema,
  },
  plugins: [deskTool(), visionTool({ defaultApiVersion }), vercelDeployTool()],
});

export default sanityConfig;
