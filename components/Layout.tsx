import { NextPage } from 'next';
import React from 'react';
import Footer from './Footer';
import Header from './Header';
import MetaHead from './MetaHead';

const Layout: NextPage = props => {
  const { children } = props;
  return (
    <>
      <MetaHead />
      <div className="flex w-full min-h-full px-5 lg:px-60 items-center">
        <div className="container">
          <div className="md:px-32">
            <Header />
            <hr className="border-t border-gray-500" />
            {children}
            <hr className="border-t border-gray-500" />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
