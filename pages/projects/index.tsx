import React, { Fragment } from 'react';
import type { NextPage } from 'next';
import { AllProjectDetails } from '../../api/queries';
// import {usePreviewSubscription, urlFor, PortableText} from '../lib/sanity'
import { getClient } from '../../lib/sanity.server';
import { Project as ProjectTypes } from '../../schema';

export const getStaticProps = async () => {
  const projects: ProjectTypes[] = await getClient().fetch(AllProjectDetails);
  return { props: { projects } };
};

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type Props = UnwrapPromise<ReturnType<typeof getStaticProps>>['props'];

const index: NextPage<Props> = props => {
  const { projects } = props;
  return (
    <>
      {projects.map(project => {
        return (
          <Fragment key={project._id}>
            <a href={`projects/${project.slug?.current}`}>{project.name}</a>
          </Fragment>
        );
      })}
    </>
  );
};

export default index;
