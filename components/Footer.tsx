import React from 'react';
import Link from 'next/link';
import {
  FaGithub,
  FaTwitter,
  FaCode,
  FaLinkedinIn,
  FaFacebook,
} from 'react-icons/fa';

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
            <span className="p-1 mx-2 text-3xl text-gray-500 rounded cursor-pointer hover:bg-gray-500 hover:text-white">
              {icon}
            </span>
          </Link>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
