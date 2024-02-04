import { MetadataRoute } from 'next';

const getBaseURL = () => {
  const _base = process.env.VERCEL_URL || 'https://localhost:3000';

  const baseURL = new URL(_base);
  baseURL.protocol = 'https';

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
