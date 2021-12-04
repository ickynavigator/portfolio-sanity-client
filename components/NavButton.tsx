import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface NBT {
  title: string;
  href: string;
}

const NavButton: React.FC<NBT> = ({ title, href }) => {
  const isActive = useRouter().pathname === href;

  return (
    <div key={title} className="col-span-1">
      <Link href={href} passHref>
        <button
          type="button"
          className={`w-full btn navBtn ${isActive ? `navBtn-active` : ``}`}
        >
          {title}
        </button>
      </Link>
    </div>
  );
};

export default NavButton;
