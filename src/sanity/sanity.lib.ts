import createImageUrlBuilder from '@sanity/image-url';
import type { Reference } from 'sanity';
import { config } from '~/sanity/sanity.config';
import { SanityImageCrop, SanityImageHotspot } from '~/schema';

const { dataset, projectId } = config;
export const imageBuilder = createImageUrlBuilder({ projectId, dataset });

type Image = {
  [key: string]: unknown;
  asset?: Reference;
  crop?: SanityImageCrop;
  hotspot?: SanityImageHotspot;
};

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
