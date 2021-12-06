import { NextPage } from 'next';
import React from 'react';

import Header from './Header';
import Footer from './Footer';
import MetaHead from './MetaHead';

const Layout: NextPage = props => {
  const { children } = props;
  return (
    <>
      <MetaHead />
      <div className="flex w-full h-full px-5 lg:px-60">
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
