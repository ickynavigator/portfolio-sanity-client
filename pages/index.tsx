import React from 'react';
import type { NextPage } from 'next';
// import Image from 'next/image';

// import {usePreviewSubscription, urlFor, PortableText} from '../lib/sanity'
import { getClient } from '../lib/sanity.server';

import MetaHead from '../components/MetaHead';

import { ProfileDetails } from '../api/queries';

import { PersonalInfo } from '../schema.d';

export const getStaticProps = async () => {
  const data: PersonalInfo = await getClient().fetch(ProfileDetails);
  return { props: { data } };
};

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type Props = UnwrapPromise<ReturnType<typeof getStaticProps>>['props'];

const Home: NextPage<Props> = props => {
  const { data } = props;
  // console.warn(data);
  return (
    <>
      <MetaHead title="Homepage" />
      <div className="">
        <h1>{data.name}</h1>
      </div>
    </>
  );
};

export default Home;
