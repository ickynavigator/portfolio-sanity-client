import { Box, Container } from '@mantine/core';
import React from 'react';
import Footer from './Footer';
import Header from './Header';
import MetaHead from './MetaHead';

const Layout = (props: { children: React.ReactNode }) => {
  const { children } = props;

  return (
    <>
      <MetaHead />

      <Box mb="sm">
        <Header />

        <Container my="md">{children}</Container>

        <Footer />
      </Box>
    </>
  );
};

export default Layout;
