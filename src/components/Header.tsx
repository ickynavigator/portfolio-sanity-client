'use client';

import {
  Anchor,
  Box,
  Burger,
  Button,
  Container,
  Drawer,
  Group,
  Stack,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import projectConfig from '../lib/project.config';
import classes from './Header.module.css';
import ThemeSwitcher from './ThemeSwitcher';

const {
  name,
  showCareerLink: showCareer,
  showCertificateLink: showCerts,
} = projectConfig;
const navMenuLinks = [
  { title: 'Projects', href: '/projects' },
  { title: 'Career', href: '/career' },
  { title: 'Contact', href: '/contact' },
  { title: 'Certificates', href: '/certificates' },
];

const Header = () => {
  const pathname = usePathname();
  const [opened, { toggle, close }] = useDisclosure(false);

  const Links = navMenuLinks.map(link => {
    if (!showCareer && link.href === '/career') return null;
    if (!showCerts && link.href === '/certificates') return null;

    return (
      <Button
        key={link.title}
        component={Link}
        href={link.href}
        size="compact-md"
        className={classes.link}
        variant="subtle"
        data-active={pathname === link.href}
        fw="bold"
        px="sm"
        style={{ border: 0 }}
      >
        {link.title}
      </Button>
    );
  });

  return (
    <Box component="header" w="100%" className={classes.header}>
      <Container fluid py="xs" className={classes.inner}>
        <Group>
          <ThemeSwitcher />
          <Anchor component={Link} href="/" underline="never">
            <Title>{name}</Title>
          </Anchor>
        </Group>

        <Group visibleFrom="md">{Links}</Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
        <Drawer
          opened={opened}
          onClose={close}
          padding="sm"
          withCloseButton={false}
          hiddenFrom="md"
          zIndex={1000000}
          position="top"
          styles={{
            header: { paddingTop: 0, paddingBottom: 0 },
            content: { height: 'fit-content' },
          }}
        >
          <Stack gap="xs" mx="-sm" my="-sm">
            {Links}
          </Stack>
        </Drawer>
      </Container>
    </Box>
  );
};

export default Header;
