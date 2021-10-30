import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { RiSunFill, RiSunLine, RiMoonFill, RiMoonLine } from 'react-icons/ri';
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
  const iconSize = '1.3em';

  return (
    <nav className="backDropCard flex items-center justify-between flex-wrap p-6">
      <div className="flex items-center flex-shrink-0 text-black mr-6">
        <span className="font-semibold text-xl tracking-tight mx-3 p-2">
          <Link href="/">Obi Fortune</Link>
        </span>
      </div>
      <div className="block lg:hidden">
        <button
          type="button"
          className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
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
              <RiSunFill size={iconSize} />
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
