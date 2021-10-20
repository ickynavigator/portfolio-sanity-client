import React from 'react';
import type { NextPage } from 'next';
import { projectSlugs } from '../../api/queries';
// import {usePreviewSubscription, urlFor, PortableText} from '../lib/sanity'
import { getClient } from '../../lib/sanity.server';
import { Project as ProjectTypes } from '../../schema';

export async function getStaticPaths() {
  const slugs: ProjectTypes = await getClient().fetch(projectSlugs);

  return {
    paths: [{ params: slugs }],
  };
}

export async function getStaticProps() {
  const slugs: ProjectTypes = await getClient().fetch(projectSlugs);

  return {
    props: [{ params: slugs }],
  };
}

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type Props = UnwrapPromise<ReturnType<typeof getStaticProps>>['props'];

const Project: NextPage<Props> = props => {
  console.warn(props);

  return <div>project</div>;
};

export default Project;
