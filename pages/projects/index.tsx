import React, { Fragment } from 'react';
import type { NextPage } from 'next';
import { projectDetails } from '../../api/queries';
// import {usePreviewSubscription, urlFor, PortableText} from '../lib/sanity'
// import {usePreviewSubscription, urlFor, PortableText} from '../lib/sanity'
import { getClient } from '../../lib/sanity.server';
import { Project as ProjectTypes } from '../../schema';

export async function getStaticProps() {
  const projects: ProjectTypes[] = await getClient().fetch(projectDetails);

  return { props: { projects } };
}

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type Props = UnwrapPromise<ReturnType<typeof getStaticProps>>['props'];

const index: NextPage<Props> = props => {
  const { projects } = props;
  return (
    <>
      {projects.map(project => {
        return <Fragment key={project._id}>{project.name}</Fragment>;
      })}
    </>
  );
};

export default index;
