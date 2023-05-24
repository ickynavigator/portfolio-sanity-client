import React from 'react';
import NavButton from './NavButton';

const navMenuLinks = [
  { title: 'Projects', href: '/projects' },
  { title: 'About', href: '/about' },
  { title: 'Home', href: '/' },
  { title: 'Contact', href: '/contact' },
  // { title: 'Certificates', href: '/certificates' },
];

const Header = () => {
  return (
    <header className="w-full">
      <nav className="flex items-center justify-center w-full py-3 m-1">
        <div className="grid justify-center grid-cols-2 gap-3 md:grid-flow-col-dense">
          {navMenuLinks.map(link => {
            return NavButton(link);
          })}
        </div>
      </nav>
    </header>
  );
};

export default Header;
