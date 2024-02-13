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
import { Configuration } from '~/schema';
import classes from './Header.module.css';
import ThemeSwitcher from './ThemeSwitcher';

const navMenuLinks = [
  { title: 'Projects', href: '/projects' },
  { title: 'Career', href: '/career' },
  { title: 'Contact', href: '/contact' },
  { title: 'Certificates', href: '/certificates' },
];

interface HeaderProps {
  projectConfig: Configuration;
}

const Header = (props: HeaderProps) => {
  const { projectConfig } = props;
  const pathname = usePathname();
  const [opened, { toggle, close }] = useDisclosure(false);
  const linksToShow = navMenuLinks.filter(link => {
    const { PageSetup: pageSetup } = projectConfig;
    if (!pageSetup.showCareerLink && link.href === '/career') return null;
    if (!pageSetup.showCertificateLink && link.href === '/certificates')
      return null;
    if (!pageSetup.showContactLink && link.href === '/contact') return null;
    if (!pageSetup.showProjectLink && link.href === '/projects') return null;

    return link;
  });

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
            <Title>{projectConfig.name}</Title>
          </Anchor>
        </Group>

        <Group visibleFrom="md" gap="lg">
          {Links}
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="md"
          size="sm"
          aria-label="Burger for profile links"
        />
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
