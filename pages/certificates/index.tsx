import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment } from 'react';
import { AllCertificates } from '../../api/queries';
import MetaHead from '../../components/MetaHead';
import { monthNames } from '../../helpers';
import { urlFor } from '../../lib/sanity';
import { getClient } from '../../lib/sanity.server';
import { Certificate as CertificateTypes } from '../../schema';

interface CertificateResponse extends CertificateTypes {
  _id: string;
}

export const getStaticProps = async () => {
  const certificates: CertificateResponse[] = await getClient().fetch(
    AllCertificates,
  );
  return { props: { certificates } };
};

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type Props = UnwrapPromise<ReturnType<typeof getStaticProps>>['props'];
const index: NextPage<Props> = props => {
  const { certificates } = props;
  const picSize = { width: 150, height: 150 };
  const fallbackCertImg = 'hi';

  return (
    <>
      <MetaHead title="All Certificates" />
      <div className="py-3">
        {certificates.map(
          ({
            _id,
            idx,
            name,
            authorityName,
            authorityImage,
            startDate,
            endDate,
            certificateLink,
            certificateHide,
          }) => {
            const aImage = urlFor(authorityImage).url();
            const sDate = new Date(startDate);
            const eDate = new Date(endDate ?? '');

            return (
              !certificateHide && (
                <Fragment key={_id}>
                  <div className="my-4 border-2 border-gray-500 rounded">
                    <div className="p-2 text-2xl font-medium text-center bg-gray-100">
                      <h2>{name}</h2>
                    </div>

                    <div className="px-3 py-3 border-t border-b border-black">
                      <div className="grid grid-cols-2 pb-3 md:grid-cols-9">
                        <div className="flex justify-center col-span-3">
                          <Image
                            src={aImage !== null ? aImage : fallbackCertImg}
                            alt={name}
                            {...picSize}
                          />
                        </div>
                        <div className="flex flex-col justify-between col-span-6 pl-5">
                          <h3 className="">{authorityName}</h3>
                          <p>
                            <span>
                              Issued on{' '}
                              {startDate
                                ? `${
                                    monthNames[sDate.getMonth()]
                                  } ${sDate.getFullYear()}`
                                : 'UNAVAILABLE'}{' '}
                              -{' '}
                              {endDate
                                ? `${
                                    monthNames[eDate.getMonth()]
                                  } ${eDate.getFullYear()}`
                                : 'No Expiration Date'}
                            </span>
                          </p>
                          <p className="text-gray-500">
                            <span>
                              Credential Id : <span>{idx}</span>
                            </span>
                          </p>
                          <p className="text-gray-500">
                            {certificateLink && (
                              <Link href={certificateLink} passHref>
                                <span className="underline cursor-pointer">
                                  View Certificate
                                </span>
                              </Link>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Fragment>
              )
            );
          },
        )}
      </div>
    </>
  );
};

export default index;
