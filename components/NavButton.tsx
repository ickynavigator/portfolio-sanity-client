import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface NBT {
  title: string;
  href: string;
}

const NavButton: React.FC<NBT> = ({ title, href }) => {
  const isActive = useRouter().pathname === href;

  return (
    <div key={title} className="col-span-1">
      <Link
        href={href}
        className={`w-full btn navBtn ${isActive ? `navBtn-active` : ``}`}
      >
        {title}
      </Link>
    </div>
  );
};

export default NavButton;
