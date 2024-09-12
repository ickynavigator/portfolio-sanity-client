import Studio from '~/app/(studio)/studio/[[...index]]/studio';

// Extend serverless function timeout
export const maxDuration = 60;

// Set the right `viewport`, `robots` and `referer` meta tags
export { metadata, viewport } from 'next-sanity/studio';

const Page = () => {
  return <Studio />;
};

export const runtime = 'edge';
export default Page;
