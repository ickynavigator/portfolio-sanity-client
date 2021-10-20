import React from 'react';
import type { NextPage } from 'next';
// import Image from 'next/image';

// import {usePreviewSubscription, urlFor, PortableText} from '../lib/sanity'
import { getClient } from '../lib/sanity.server';

import MetaHead from '../components/MetaHead';
import styles from '../styles/Home.module.css';

import { fetchProfile } from '../api/queries';

import { PersonalInfo } from '../schema.d';

export const getStaticProps = async () => {
  const preview = process.env.NODE_ENV !== 'production';
  const data: PersonalInfo = await getClient(preview).fetch(fetchProfile);

  return {
    props: {
      preview,
      data,
    },
  };
};

// export async function getStaticPaths() {
//   const paths = await getClient().fetch()

//   return {
//     paths: paths.map((slug) => ({params: {slug}})),
//     fallback: true,
//   }
// }

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type Props = UnwrapPromise<ReturnType<typeof getStaticProps>>['props'];

const Home: NextPage<Props> = props => {
  const { data } = props;
  // console.warn(data);
  return (
    <div className={styles.container}>
      <MetaHead title="Homepage" />
      <h1>{data.name}</h1>
    </div>
  );
};

export default Home;
