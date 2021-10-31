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

  const picSize = {
    width: 1000,
    height: 600,
  };
  return (
    <>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6 justify-items-center">
          {projects.map(project => {
            return (
              <Fragment key={project._id}>
                {/* <a href={`projects/${project.slug?.current}`}>{project.name}</a> */}
                <a
                  href={`projects/${project.slug?.current}`}
                  className="grid grid-cols-3 border-2 border-dashed hover:border-black w-full"
                >
                  <div className="col-span-2 flex justify-center">
                    <Image
                      src={
                        urlFor(project.projectImage?.asset)
                          .width(picSize.width)
                          .height(picSize.height)
                          .url() || 'assets/project/dummyImg.png'
                      }
                      width={`${picSize.width}`}
                      height={`${picSize.height}`}
                    />
                  </div>
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
      </div>
    </>
  );
};

export default index;
