import { NextPage } from 'next';
import React from 'react';

import Header from './Header';
import Footer from './Footer';
import MetaHead from './MetaHead';

const Layout: NextPage = props => {
  const { children } = props;
  return (
    <div className="justify-center h-screen px-5 md:px-32">
      <MetaHead />
      <Header />
      <hr className="border-t border-gray-500" />
      {children}
      <hr className="border-t border-gray-500" />
      <Footer />
    </div>
  );
};

export default Layout;
