import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import axios from 'axios';
import { config } from './sanity.config';

const { projectId, dataset } = config;
const builder = imageUrlBuilder(config);
/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source).url();
}

export const getUrlFromId = (ref: string) => {
  // eslint-disable-next-line no-unused-vars
  const [_file, id, extension] = ref.split('-');
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${extension}`;
};

export const postToSanity = async <T = any, D = any>(data: DeEnhanced<D>) => {
  const dryrun = process.env.NODE_ENV !== 'production';

  return axios<T>({
    method: 'post',
    url: `api/sanity/post?dryrun=${dryrun}`,
    headers: {
      'Content-type': 'application/json',
    },
    data,
  });
};
