import Head from 'next/head';
import React from 'react';

interface T {
  title?: string;
  description?: string;
  icon?: string;
  keywords?: string;
}
const MetaHead: React.FC<T> = ({ title, description, icon, keywords }) => {
  return (
    <Head>
      <title>{title || `Obi Fortune Personal Portfolio`}</title>
      <meta
        name="description"
        content={
          description ||
          `Obi Fortune Personal Portfolio. Built with Next.js and Sanity.`
        }
      />
      <link rel="icon" href={icon || `/favicon.ico`} />
      <meta
        name="keywords"
        content={keywords || `PORTFOLIO, DEVELOPER, NEXTJS, REACTJS, SANITY`}
      />
      <meta name="author" content="Obi Fortune" />

      <meta name="robots" content="index, follow" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="5 days" />
    </Head>
  );
};

export default MetaHead;
