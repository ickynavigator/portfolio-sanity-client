import React from 'react';
import type { NextPage } from 'next';
import { GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { projectSlugs, projectDetails } from '../../api/queries';
// import {usePreviewSubscription, urlFor, PortableText} from '../lib/sanity'
import { getClient } from '../../lib/sanity.server';
import { Project as ProjectTypes } from '../../schema';

interface IParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths = async () => {
  const Projects: ProjectTypes[] = await getClient().fetch(projectSlugs);
  const paths = Projects.map(project => ({
    params: { slug: project.slug?.current },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { slug } = context.params as IParams;
  const project: ProjectTypes = await getClient().fetch(projectDetails, {
    slug,
  });

  return { props: { project } };
};

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type Props = UnwrapPromise<ReturnType<typeof getStaticProps>>['props'];

const ProjectPage: NextPage<Props> = props => {
  const { project } = props;

  return <div>{project._id}</div>;
};

export default ProjectPage;
