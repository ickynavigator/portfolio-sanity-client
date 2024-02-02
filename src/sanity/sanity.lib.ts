import createImageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';
import { config } from '~/sanity/sanity.config';

const { dataset, projectId } = config;
export const imageBuilder = createImageUrlBuilder({ projectId, dataset });

export const getBuiltImage = (source?: Image) => {
  if (!source) {
    return undefined;
  }

  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined;
  }

  return imageBuilder.image(source).auto('format');
};

export const urlForImage = (source?: Image) => {
  const builtImage = getBuiltImage(source);
  return builtImage?.url();
};

export const getUrlFromId = (ref: string) => {
  // eslint-disable-next-line no-unused-vars
  const [_file, id, extension] = ref.split('-');
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${extension}`;
};
