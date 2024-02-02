import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { config } from './sanity.config';

const { projectId, dataset } = config;
const builder = imageUrlBuilder(config);
/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 */
export const urlFor = (source: SanityImageSource) => {
  return builder.image(source).url();
};

export const getUrlFromId = (ref: string) => {
  // eslint-disable-next-line no-unused-vars
  const [_file, id, extension] = ref.split('-');
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${extension}`;
};
