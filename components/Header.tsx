import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  RiSunFill,
  RiSunLine,
  RiMoonFill,
  RiMoonLine,
  RiMenuFill,
  RiCloseFill,
} from 'react-icons/ri';
import { useDarkMode } from '../hooks';

const Links = [
  { title: 'Projects', href: 'projects' },
  { title: 'About', href: 'about' },
  { title: 'Certificates', href: 'certificates' },
  { title: 'Contact Me', href: 'contact' },
];

const Header = () => {
  const router = useRouter();
  const [darkMode, setDarkMode] = useDarkMode();
  const [navBar, setNavBar] = useState(false);
  const iconSize = '1.3em';

  return (
    <nav className="backDropCard flex items-center justify-between flex-wrap p-6 mb-6">
      <div className="flex items-center flex-shrink-0 text-black mr-6">
        <Link href="/" passHref>
          <div className="cursor-pointer ml-3 p-2 flex items-center">
            <Image src="/assets/images/fox.svg" width="30px" height="30px" />
            <span className="font-semibold text-xl tracking-tight">
              Obi Fortune
            </span>
          </div>
        </Link>
      </div>
      <div className="block lg:hidden">
        <button
          type="button"
          className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
          onClick={() => {
            setNavBar(!navBar);
          }}
        >
          {navBar ? <RiCloseFill /> : <RiMenuFill />}
        </button>
      </div>
      <div
        className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto navMenu navMenu__${
          navBar ? `show` : `hidden`
        }`}
      >
        <div className="text-sm lg:flex-grow lg:flex">
          {Links.map(({ title, href }) => {
            const activeBtn =
              router.pathname.toLowerCase() !== `/${href.toLowerCase()}`
                ? `btn__primary hvr-gradient-btn`
                : `btn__secondary`;

            return (
              <div className={`btn ${activeBtn} navLink`} key={title}>
                <Link href={`/${href}`}>{title}</Link>
              </div>
            );
          })}
        </div>

        <div>
          <div className="w-full flex flex-row justify-center items-center mt-4 lg:mt-0">
            {darkMode ? (
              <RiSunLine size={iconSize} />
            ) : (
              <RiSunFill size={iconSize} fillRule="inherit" />
            )}
            <div className="switch mx-3">
              <div className="switch__1">
                <input
                  id="darkModeIdswitch"
                  type="checkbox"
                  checked={darkMode}
                  onChange={e => {
                    setDarkMode(e.target.checked);
                  }}
                />
                <label htmlFor="darkModeIdswitch" />
              </div>
            </div>
            {darkMode ? (
              <RiMoonFill size={iconSize} />
            ) : (
              <RiMoonLine size={iconSize} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
