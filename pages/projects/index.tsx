import React, { Fragment } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import { AllProjectDetails } from '../../api/queries';
import {
  // usePreviewSubscription,
  urlFor,
  // PortableText
} from '../../lib/sanity';
import { getClient } from '../../lib/sanity.server';
import { Project as ProjectTypes } from '../../schema';

interface ProjectResponse extends ProjectTypes {
  _id: string;
}

export const getStaticProps = async () => {
  const projects: ProjectResponse[] = await getClient().fetch(
    AllProjectDetails,
  );
  return { props: { projects } };
};

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type Props = UnwrapPromise<ReturnType<typeof getStaticProps>>['props'];

const index: NextPage<Props> = props => {
  const { projects } = props;
  return (
    <>
      <div className="row-auto">
        {projects.map(project => {
          return (
            <Fragment key={project._id}>
              {/* <a href={`projects/${project.slug?.current}`}>{project.name}</a> */}
              <a
                href={`projects/${project.slug?.current}`}
                className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white hover:bg-gray-100 border shadow-md items-center"
              >
                <Image
                  className="w-75 h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
                  src={
                    urlFor(project.projectImage?.asset).width(231).url() ||
                    'assets/project/dummyImg.png'
                  }
                  alt=""
                  width="680px"
                  height="680px"
                />
                <div className="p-4 flex flex-col justify-between leading-normal">
                  <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">
                    {project.name}
                  </h5>

                  <button
                    data-tippy-content="Tooltip Content"
                    data-tippy-animation="scale"
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Default tooltip
                  </button>
                  <button
                    data-tippy-content="Tooltip Content"
                    data-tippy-animation="fade"
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Default tooltip
                  </button>
                </div>
              </a>
            </Fragment>
          );
        })}
      </div>
    </>
  );
};

export default index;
