import React, { Fragment } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { RiCodeSSlashFill, RiEye2Line } from 'react-icons/ri';

import { AllProjectDetails } from '../../api/queries';
import { urlFor } from '../../lib/sanity';
import { getClient } from '../../lib/sanity.server';
import { Project as ProjectTypes } from '../../schema';
import CardIcon from '../../components/CardIcon';

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

  const picSize = { width: 1000, height: 600 };

  return (
    <>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-6 2xl:grid-cols-2 justify-items-center">
          {projects.map(project => {
            const buttonDetails = [
              {
                tip: 'SourceCode',
                icon: <RiCodeSSlashFill />,
                url: project.sourceUrl?.url,
                visibility: project.sourceUrl?.visibility,
              },
              {
                tip: 'Live Project',
                icon: <RiEye2Line />,
                url: project.projectUrl?.url,
                visibility: project.projectUrl?.visibility,
              },
            ];

            return (
              <Fragment key={project._id}>
                <div>
                  <div className="grid w-full grid-cols-3 p-2 overflow-hidden border-2 border-dashed rounded-xl hover:border-black">
                    <Link passHref href={`projects/${project.slug?.current}`}>
                      <>
                        <div className="flex justify-center col-span-2">
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
                        <div className="flex flex-col justify-around p-4 leading-normal text-center">
                          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                            {project.name}
                          </h5>
                          <div className="flex flex-row justify-between mx-10">
                            {buttonDetails.map(button => CardIcon(button))}
                          </div>
                        </div>
                      </>
                    </Link>
                  </div>
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default index;
