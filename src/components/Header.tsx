'use client';

import {
  Anchor,
  Box,
  Burger,
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

const { name } = projectConfig;
const navMenuLinks = [
  { title: 'Projects', href: '/projects' },
  { title: 'Career', href: '/career' },
  { title: 'Contact', href: '/contact' },
  { title: 'Certificates', href: '/certificates' },
];
const linksToShow = navMenuLinks.filter(link => {
  if (!projectConfig.showCareerLink && link.href === '/career') return null;
  if (!projectConfig.showCertificateLink && link.href === '/certificates')
    return null;
  if (!projectConfig.showContactLink && link.href === '/contact') return null;
  if (!projectConfig.showProjectLink && link.href === '/projects') return null;

  return link;
});

const Header = () => {
  const pathname = usePathname();
  const [opened, { toggle, close }] = useDisclosure(false);

  const Links = linksToShow.map(link => {
    return (
      <Anchor
        key={link.title}
        component={Link}
        href={link.href}
        data-active={pathname === link.href}
        className={classes.link}
      >
        {link.title}
      </Anchor>
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

        <Group visibleFrom="md" gap="lg">
          {Links}
        </Group>

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
          <Stack gap="xl" mx="-sm" my="-sm" p="xl" align="center">
            {Links}
          </Stack>
        </Drawer>
      </Container>
    </Box>
  );
};

export default Header;
