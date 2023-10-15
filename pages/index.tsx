import type { NextPage } from 'next';
import Image from 'next/image';
import { FaCheck, FaHourglassHalf, FaTimes } from 'react-icons/fa';
import MetaHead from '../components/MetaHead';
import { ProfileDetails } from '../groq/queries';
import { urlFor } from '../lib/sanity';
import { getClient } from '../lib/sanity.server';
import { Category, PersonalInfo } from '../schema.d';

interface PersonalInfoResponse extends PersonalInfo {
  skills: Category[];
}

export const getStaticProps = async () => {
  const data: PersonalInfoResponse = await getClient().fetch(ProfileDetails);

  return { props: { data: { ...data } } };
};

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type Props = UnwrapPromise<ReturnType<typeof getStaticProps>>['props'];

const Home: NextPage<Props> = props => {
  const { data } = props;
  const { name, title, jobStatus, image, jobVisibility } = data;

  const picSize = { width: 160, height: 160 };
  const jobStatusCheck = (() => {
    let message: string;
    let color: string;
    let icon: JSX.Element;

    switch (jobStatus) {
      case 'inbetween':
        message = 'Kind of available at the moment';
        color = 'bg-yellow-200 border-yellow-400 text-yellow-800';
        icon = <FaHourglassHalf />;
        break;
      case 'close':
        message = 'Not available for hire at the moment';
        color = 'bg-red-200 border-red-400 text-red-800';
        icon = <FaTimes />;
        break;
      case 'open':
      default:
        message = 'Available for hire';
        color = 'bg-green-200 border-green-400 text-green-800';
        icon = <FaCheck />;
        break;
    }

    return { message, color, icon };
  })();
  const myImage = urlFor(image).url();
  // TODO
  // set fall back image
  const fallBackImage = '';

  return (
    <>
      <MetaHead title="Home" />
      <div className="flex flex-col justify-center py-3">
        <div className="flex justify-center my-2">
          <Image
            className="flex overflow-hidden rounded-full"
            src={myImage !== null ? myImage : fallBackImage}
            alt={name}
            {...picSize}
          />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-semibold">{name}</h1>
          <hr className="w-3/12 my-3" />
          <h2 className="text-2xl font-semibold text-gray-500">{title}</h2>
        </div>
        {jobVisibility && (
          <>
            <h3 className="text-xl font-semibold text-gray-500 text-center">
              Job Status
            </h3>
            <div
              className={`${jobStatusCheck.color} flex justify-center items-center rounded border-2`}
            >
              {jobStatusCheck.icon}
              <span className="ml-4">{jobStatusCheck.message}</span>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
