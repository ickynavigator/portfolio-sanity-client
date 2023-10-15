import { Container } from '@mantine/core';
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

const Layout = (props: { children: React.ReactNode }) => {
  const { children } = props;

  return (
    <>
      <MetaHead />

      <div className={`${firaSans.className}`}>
        <Header />

        <Container my="md">{children}</Container>

        <Footer />
      </div>
    </>
  );
};

export default Layout;
