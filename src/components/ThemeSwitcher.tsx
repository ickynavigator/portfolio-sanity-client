'use client';

import {
  ActionIcon,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons-react';
import cx from 'clsx';
import classes from './ThemeSwitcher.module.css';

const ThemeSwitcher = () => {
  const { setColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ActionIcon
      onClick={toggleColorScheme}
      size="md"
      aria-label="Toggle color scheme"
      color={computedColorScheme === 'dark' ? 'yellow' : 'gray'}
      variant="outline"
    >
      <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
      <IconMoonStars className={cx(classes.icon, classes.dark)} stroke={1.5} />
    </ActionIcon>
  );
};

export default ThemeSwitcher;
