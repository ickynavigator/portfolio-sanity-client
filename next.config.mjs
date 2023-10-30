import './env/client.mjs';
import './env/server.mjs';

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io'],
  },
};

export default config;
