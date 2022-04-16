import type { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import { FaFileDownload } from 'react-icons/fa';
import { AboutMeDetails } from '../../api/queries';
import MetaHead from '../../components/MetaHead';
import { getUrlFromId, PortableText } from '../../lib/sanity';
import { getClient } from '../../lib/sanity.server';
import { PersonalInfo } from '../../schema';

export const getStaticProps = async () => {
  const details: PersonalInfo = await getClient().fetch(AboutMeDetails);
  return { props: { details } };
};

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type Props = UnwrapPromise<ReturnType<typeof getStaticProps>>['props'];

const index: NextPage<Props> = props => {
  const { details } = props;
  const { bio, CV, CVLastUpdatedAt } = details;

  return (
    <>
      <MetaHead title="About Me" />

      <div className="py-3">
        <div className="text-center">
          <PortableText blocks={bio} />

          <div>
            <Link href={getUrlFromId(CV?.asset._ref)} passHref>
              <a
                href="replace"
                className="inline-flex items-center px-3 py-2 my-3 text-white bg-gray-500 rounded hover:bg-gray-400"
              >
                <FaFileDownload className="mr-1" /> Download my CV
              </a>
            </Link>
          </div>
          {CVLastUpdatedAt && (
            <span className="text-gray-500">
              Last Modified on {new Date(CVLastUpdatedAt).toDateString()}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default index;
