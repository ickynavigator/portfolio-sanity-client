import { Container, Stack } from '@mantine/core';
import React from 'react';
import Footer from './Footer';
import Header from './Header';
import MetaHead from './MetaHead';

const Layout = (props: { children: React.ReactNode }) => {
  const { children } = props;

  return (
    <>
      <MetaHead />

      <Stack pb="sm" h="100%" justify="space-between">
        <Header />

        <Container>{children}</Container>

        <Footer />
      </Stack>
    </>
  );
};

export default Layout;
