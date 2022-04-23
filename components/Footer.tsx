import Link from 'next/link';
import React from 'react';
import {
  FaCode,
  FaFacebook,
  FaGithub,
  FaLinkedinIn,
  FaStripeS,
  FaTwitter,
} from 'react-icons/fa';
import { AllSocialLinks } from '../api/queries';
import { useSanityFetch } from '../hooks';
import { SocialLink } from '../schema';
import Tooltip from './Tooltip';

const SocialLinksIcons = (name: string) => {
  switch (name) {
    case 'Facebook':
      return <FaFacebook />;
    case 'Github':
      return <FaGithub />;
    case 'LinkedIn':
      return <FaLinkedinIn />;
    case 'Twitter':
      return <FaTwitter />;
    case 'Code':
      return <FaCode />;
    default:
      return <FaStripeS />;
  }
};

const defaultSocialLink: SocialLink[] = [
  {
    _type: 'socialLink',
    link: 'https://github.com/ickynavigator',
    name: 'Github',
  },
  {
    _type: 'socialLink',
    link: 'https://twitter.com/obifortunebleh',
    name: 'Twitter',
  },
  {
    _type: 'socialLink',
    link: 'https://github.com/',
    name: 'Code',
  },
  {
    _type: 'socialLink',
    link: 'https://www.linkedin.com/in/obifortune/ ',
    name: 'LinkedIn',
  },
  {
    _type: 'socialLink',
    link: 'https://www.facebook.com/obi.fortune2',
    name: 'Facebook',
  },
];

const Footer: React.FC = () => {
  const [socialLinks, loading] = useSanityFetch<SocialLink[]>(
    AllSocialLinks,
    defaultSocialLink,
  );

  return (
    <footer>
      <div className="flex justify-center m-3">
        {' '}
        {!loading &&
          socialLinks &&
          socialLinks.map(({ name, link }) => (
            <Link key={name} href={link} passHref>
              <a
                href="replace"
                aria-label={name}
                className="p-1 mx-2 text-3xl text-gray-500 rounded cursor-pointer hover:bg-gray-500 hover:text-white"
              >
                <Tooltip tip={name} tipClass="text-sm text-gray-500">
                  {SocialLinksIcons(name)}
                </Tooltip>
              </a>
            </Link>
          ))}
      </div>
    </footer>
  );
};

export default Footer;
