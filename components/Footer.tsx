import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  FaCode,
  FaFacebook,
  FaGithub,
  FaLinkedinIn,
  FaStripeS,
  FaTwitter,
} from 'react-icons/fa';
import { AllSocialLinks } from '../api/queries';
import { defaultSocialLinks, insert, sourceCodeLink } from '../helpers';
import { useSanityFetch } from '../hooks';
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

const Footer: React.FC = () => {
  const [socialLinks, loading] = useSanityFetch(
    AllSocialLinks,
    defaultSocialLinks,
  );
  const [updatedSocialLinks, setUpdatedSocialLinks] = useState(socialLinks);
  useEffect(() => {
    setUpdatedSocialLinks(
      insert(socialLinks, Math.floor(socialLinks.length / 2), sourceCodeLink),
    );
  }, [socialLinks]);

  return (
    <footer>
      <div className="flex justify-center m-3">
        {' '}
        {!loading &&
          updatedSocialLinks.map(({ name, link }) => (
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
