import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: `Contact Me`,
};

const Layout = ({ children }: PropsWithChildren) => {
  return children;
};

export default Layout;
