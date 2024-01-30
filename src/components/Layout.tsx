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

      <Stack h="100%" justify="space-between" align="center">
        <Header />

        <Container w="100%">{children}</Container>

        <Footer />
      </Stack>
    </>
  );
};

export default Layout;
