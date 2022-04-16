import Link from 'next/link';
import React from 'react';
import {
  FaCode,
  FaFacebook,
  FaGithub,
  FaLinkedinIn,
  FaTwitter,
} from 'react-icons/fa';
import Tooltip from './Tooltip';

// TODO
// find a way to fetch the links data from the sanity
const socialLinks = [
  {
    hide: false,
    icon: <FaGithub />,
    link: 'https://github.com/ickynavigator',
    name: 'Github',
  },
  {
    hide: false,
    icon: <FaTwitter />,
    link: 'https://twitter.com/obifortunebleh',
    name: 'Twitter',
  },
  {
    hide: false,
    icon: <FaCode />,
    link: 'https://github.com/',
    name: 'Site Source Code',
  },
  {
    hide: false,
    icon: <FaLinkedinIn />,
    link: 'https://www.linkedin.com/in/obifortune/ ',
    name: 'LinkedIn',
  },
  {
    hide: false,
    icon: <FaFacebook />,
    link: 'https://www.facebook.com/obi.fortune2',
    name: 'Facebook',
  },
];

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="flex justify-center m-3">
        {socialLinks.map(({ name, link, icon }) => (
          <Link key={name} href={link} passHref>
            <a
              href="replace"
              className="p-1 mx-2 text-3xl text-gray-500 rounded cursor-pointer hover:bg-gray-500 hover:text-white"
            >
              <Tooltip tip={name} tipClass="text-sm text-gray-500">
                {icon}
              </Tooltip>
            </a>
          </Link>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
