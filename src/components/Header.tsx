import {
  Anchor,
  Container,
  Group,
  Header as MantineHeader,
  Title,
  createStyles,
  rem,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import projectConfig from '../lib/project.config';
import ThemeSwitcher from './ThemeSwitcher';

const { name, showCareerLink, showCertificateLink } = projectConfig;
const navMenuLinks = [
  { title: 'Projects', href: '/projects' },
  { title: 'Career', href: '/career' },
  { title: 'Contact', href: '/contact' },
  { title: 'Certificates', href: '/certificates' },
];

const useStyles = createStyles(theme => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-between',
    [theme.fn.smallerThan('sm')]: {
      justifyContent: 'center',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.fn.variant({
      variant: theme.colorScheme,
      color: theme.primaryColor,
    }).color,
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    transition: 'color 200ms ease, background-color 200ms ease',

    '&:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).hover,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'dark',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'dark', color: theme.primaryColor })
        .color,
    },
  },
}));

const Header = () => {
  const router = useRouter();
  const { classes, cx } = useStyles();
  const matches = useMediaQuery('(min-width: 56.25em)', true, {
    getInitialValueInEffect: false,
  });

  return (
    <MantineHeader height={matches ? 60 : 120} w="100%">
      <Container fluid py="xs">
        <Group className={classes.header}>
          <Group>
            <ThemeSwitcher />
            <Anchor component={Link} href="/" underline={false}>
              <Title>{name}</Title>
            </Anchor>
          </Group>

          <Group>
            {navMenuLinks.map(link => {
              if (!showCareerLink && link.href === '/career') return null;
              if (!showCertificateLink && link.href === '/certificates')
                return null;

              return (
                <Link
                  key={link.title}
                  href={link.href}
                  className={cx(classes.link, {
                    [classes.linkActive]: router.pathname === link.href,
                  })}
                >
                  {link.title}
                </Link>
              );
            })}
          </Group>
        </Group>
      </Container>
    </MantineHeader>
  );
};

export default Header;
