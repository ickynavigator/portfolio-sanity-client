import { NextPage } from 'next';
import React from 'react';

import Header from './Header';
import MetaHead from './MetaHead';

const Layout: NextPage = ({ children }) => {
  return (
    <div>
      <MetaHead />
      <Header />
      <hr className="border-t border-gray-500" />
      {children}
    </div>
  );
};

export default Layout;
