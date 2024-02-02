import type { Metadata, Viewport } from 'next';
import { metadata as studioMetadata } from 'next-sanity/studio/metadata';
import { viewport as studioViewport } from 'next-sanity/studio/viewport';

import Studio from '~/app/(studio)/studio/[[...index]]/studio';

// Set the right `viewport`, `robots` and `referer` meta tags
export const metadata: Metadata = {
  ...studioMetadata,
  // Overrides the title until the Studio is loaded
  title: 'Loading Studio…',
};

export const viewport: Viewport = {
  ...studioViewport,
  // Overrides the viewport to resize behavior
  interactiveWidget: 'resizes-content',
};

const Page = () => {
  return <Studio />;
};

export default Page;
