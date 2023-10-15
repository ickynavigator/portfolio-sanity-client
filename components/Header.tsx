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
import ThemeSwitcher from './ThemeSwitcher';

const navMenuLinks = [
  { title: 'Projects', href: '/projects' },
  { title: 'Contact', href: '/contact' },
  { title: 'About', href: '/about' },
  // { title: 'Certificates', href: '/certificates' },
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
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
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
    <MantineHeader height={matches ? 60 : 100}>
      <Container fluid py="xs">
        <Group className={classes.header}>
          <Group>
            <ThemeSwitcher />
            <Anchor component={Link} href="/" underline={false}>
              <Title>OBI FORTUNE</Title>
            </Anchor>
          </Group>

          <Group>
            {navMenuLinks.map(link => (
              <Link
                key={link.title}
                href={link.href}
                className={cx(classes.link, {
                  [classes.linkActive]: router.pathname === link.href,
                })}
              >
                {link.title}
              </Link>
            ))}
          </Group>
        </Group>
      </Container>
    </MantineHeader>
  );
};

export default Header;
