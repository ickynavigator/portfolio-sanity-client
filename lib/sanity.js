import {
  createImageUrlBuilder,
  createPortableTextComponent,
  createCurrentUserHook,
} from 'next-sanity';
import axios from 'axios';

import { config } from './config';

const { projectId, dataset } = config;
/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 */
export const urlFor = source => createImageUrlBuilder(config).image(source);

// Set up Portable Text serialization
export const PortableText = createPortableTextComponent({
  ...config,
  // Serializers passed to @sanity/block-content-to-react
  // (https://github.com/sanity-io/block-content-to-react)
  serializers: {},
});

// Helper function for using the current logged in user account
export const useCurrentUser = createCurrentUserHook(config);

export const getUrlFromId = ref => {
  // eslint-disable-next-line no-unused-vars
  const [_file, id, extension] = ref.split('-');
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${extension}`;
};

export const postToSanity = async data => {
  const dryrun = process.env.NODE_ENV !== 'production' ? '?dryRun=true' : '';

  return axios({
    method: 'post',
    url: `https://${config.projectId}.api.sanity.io/v2021-06-07/data/mutate/${config.dataset}${dryrun}`,
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_TOKEN}`,
      'Content-type': 'application/json',
    },
    data: JSON.stringify({ mutations: [data] }),
  });
};

export const postContactForm = data => {
  return postToSanity({ createOrReplace: { _type: 'contactForms', ...data } });
};
