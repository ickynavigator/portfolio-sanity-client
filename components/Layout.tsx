import { Container } from '@mantine/core';
import { NextPage } from 'next';
import { Fira_Sans as FiraSans } from 'next/font/google';
import React from 'react';
import Footer from './Footer';
import Header from './Header';
import MetaHead from './MetaHead';

const firaSans = FiraSans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const Layout: NextPage<{ children: React.ReactNode }> = props => {
  const { children } = props;

  return (
    <>
      <MetaHead />

      <div className={`${firaSans.className}`}>
        <Header />

        <Container>{children}</Container>

        <Footer />
      </div>
    </>
  );
};

export default Layout;
