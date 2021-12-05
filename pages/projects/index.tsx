import React, { Fragment } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaLaptopCode,
  FaRegEye,
  FaCheck,
  FaHourglassHalf,
  FaTimes,
} from 'react-icons/fa';

import { AllProjectDetails } from '../../api/queries';
import { urlFor, PortableText } from '../../lib/sanity';
import { getClient } from '../../lib/sanity.server';
import { Project as ProjectTypes } from '../../schema';
import Tooltip from '../../components/Tooltip';

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
    <div className="container mx-auto my-10">
      <div className="gap-4 row">
        {projects.map(
          ({
            name,
            _id,
            sourceUrl,
            projectUrl,
            body,
            profileStatus,
            projectIssuer,
            projectImage,
          }) => {
            const buttonDetails = [
              {
                tip: 'Source Code',
                icon: <FaLaptopCode />,
                url: sourceUrl?.url,
                visibility: sourceUrl?.visibility,
              },
              {
                tip: 'Live Project',
                icon: <FaRegEye />,
                url: projectUrl?.url,
                visibility: projectUrl?.visibility,
              },
            ];
            const profileStatusIcon = (() => {
              switch (profileStatus) {
                case 'completed':
                  return {
                    icon: <FaCheck />,
                    color: 'bg-green-200 border-green-400',
                  };
                case 'ongoing':
                  return {
                    icon: <FaHourglassHalf />,
                    color: 'bg-yellow-200 border-yellow-400',
                  };
                case 'abandoned':
                  return {
                    icon: <FaTimes />,
                    color: 'bg-red-200 border-red-400',
                  };
                default:
                  return {
                    icon: <FaCheck />,
                    color: 'bg-green-200 border-2 border-green-400',
                  };
              }
            })();
            const pImage = urlFor(projectImage).url();

            return (
              <Fragment key={_id}>
                <div className="my-2 border-2 border-gray-500 rounded">
                  <div className="p-2 text-2xl font-medium text-center bg-gray-100">
                    {name}
                  </div>

                  <div className="px-3 py-3 border-t border-b border-black">
                    <div className="grid grid-cols-2 pb-3 md:grid-cols-9">
                      <div className="col-span-6">
                        {projectImage && (
                          <Image
                            src={pImage !== null ? pImage : 'hi'}
                            alt={name}
                            {...picSize}
                          />
                        )}
                      </div>
                      <div className="col-span-3 pl-5">
                        <PortableText blocks={body} />
                      </div>
                    </div>

                    {projectIssuer && (
                      <div className="flex items-center justify-center mb-4 bg-gray-300 border-2 border-black rounded">
                        Project By:
                        {projectIssuer.link ? (
                          <Link href={projectIssuer.link} passHref>
                            <span className="ml-1 underline cursor-pointer">
                              {projectIssuer.name}
                            </span>
                          </Link>
                        ) : (
                          <span className="ml-1">{projectIssuer.name}</span>
                        )}
                      </div>
                    )}
                    <div
                      className={`${profileStatusIcon.color} flex justify-center items-center rounded border-2`}
                    >
                      {profileStatusIcon.icon}
                      <span className="ml-4">{profileStatus}</span>
                    </div>
                  </div>

                  <div className="flex flex-row justify-between p-2 bg-gray-100">
                    {buttonDetails.map(({ tip, icon, url, visibility }) => {
                      return !visibility && url ? (
                        <div key={url}>
                          <Tooltip tip={tip} tipClass="text-gray-600">
                            <Link href={url} passHref>
                              <button
                                type="button"
                                className="px-3 py-1 text-2xl transition bg-gray-400 rounded hover:bg-gray-300"
                              >
                                {icon}
                              </button>
                            </Link>
                          </Tooltip>
                        </div>
                      ) : (
                        <div>Link Unavailable</div>
                      );
                    })}
                  </div>
                </div>
              </Fragment>
            );
          },
        )}
      </div>
    </div>
  );
};

export default index;
