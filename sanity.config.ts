import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
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
    structureTool({
      structure: S =>
        S.list()
          .title('Portfolio')
          .items([
            S.listItem()
              .title('Configuration')
              .child(
                S.document()
                  .schemaType('configuration')
                  .documentId('configuration'),
              ),
            S.listItem()
              .title('Personal info')
              .child(
                S.document()
                  .schemaType('personalInfo')
                  .documentId('personalInfo'),
              ),
            ...S.documentTypeListItems().filter(
              listItem =>
                !['configuration', 'personalInfo'].includes(
                  `${listItem.getId()}`,
                ),
            ),
          ]),
    }),
    visionTool({ defaultApiVersion }),
  ],
});

export default sanityConfig;
