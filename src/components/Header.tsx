'use client';

import { Anchor, Box, Button, Container, Group, Title } from '@mantine/core';
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

  return (
    <Box component="header" w="100%" className={classes.wrapper}>
      <Container fluid py="xs">
        <Group
          className={classes.header}
          display="flex"
          align="center"
          h="100%"
          justify="space-between"
        >
          <Group>
            <ThemeSwitcher />
            <Anchor component={Link} href="/" underline="never">
              <Title>{name}</Title>
            </Anchor>
          </Group>

          <Group>
            {navMenuLinks.map(link => {
              if (!showCareer && link.href === '/career') return null;
              if (!showCerts && link.href === '/certificates') return null;

              return (
                <Button
                  component={Link}
                  key={link.title}
                  href={link.href}
                  size="compact-md"
                  className={classes.link}
                  variant="subtle"
                  data-active={pathname === link.href}
                >
                  {link.title}
                </Button>
              );
            })}
          </Group>
        </Group>
      </Container>
    </Box>
  );
};

export default Header;
