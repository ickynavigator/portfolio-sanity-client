import { MetadataRoute } from 'next';
import env from '~/env/server.mjs';

const getBaseURL = () => {
  const baseURL = new URL(`https://${env.VERCEL_URL}`);

  return baseURL;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseURL = getBaseURL().toString();

  return [
    {
      url: `${baseURL}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseURL}career`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseURL}certificates`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseURL}contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseURL}projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
