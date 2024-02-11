import type { InferSchemaValues } from '@sanity-typed/types';
import { defineConfig } from '@sanity-typed/types';
import { visionTool } from '@sanity/vision';
import { vercelDeployTool } from 'sanity-plugin-vercel-deploy';
import { structureTool } from 'sanity/structure';
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
  plugins: [
    structureTool(),
    visionTool({ defaultApiVersion }),
    vercelDeployTool(),
  ],
});

export type SanityValues = InferSchemaValues<typeof sanityConfig>;
export default sanityConfig;
