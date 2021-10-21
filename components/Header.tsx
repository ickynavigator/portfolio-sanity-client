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
    <div className="w-100 backDropCard">
      <div className="flex flex-row">
        <div className="">
          <div className="btn btn__secondary mx-3 p-2">
            <Link href="/">Obi Fortune</Link>
          </div>
        </div>

        <div className="ml-auto flex justify-center">
          {Links.map(({ title, href }) => {
            const btnClass =
              router.pathname.toLowerCase() !== `/${href.toLowerCase()}`
                ? `primary`
                : `secondary`;

            return (
              <div className={`btn btn__${btnClass} mx-2 p-2`} key={title}>
                <Link href={`/${href}`}>{title}</Link>
              </div>
            );
          })}
        </div>

        <div className="flex flex-row items-center">
          {darkMode ? (
            <RiSunLine size={iconSize} />
          ) : (
            <RiSunFill size={iconSize} />
          )}
          <div className="switch mx-1">
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
  );
};

export default Header;
