'use client';

import {
  ActionIcon,
  Loader,
  ThemeIcon,
  rem,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import { useMounted } from '@mantine/hooks';
import { IconMoonStars, IconSun } from '@tabler/icons-react';
import TransitionGroup from '~/components/TransitionGroup';

const size = rem(16);
const iconStyles = { stroke: 1.5, style: { width: size, height: size } };

const ThemeSwitcher = () => {
  const mounted = useMounted();

  const { toggleColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });

  const computedColorScheme = useComputedColorScheme('dark', {
    getInitialValueInEffect: false,
  });

  const isDarkMode = computedColorScheme === 'dark';

  return mounted ? (
    <ActionIcon
      onClick={toggleColorScheme}
      size="md"
      aria-label="Toggle color scheme"
      color={isDarkMode ? 'yellow' : 'gray'}
      variant="outline"
    >
      <TransitionGroup
        status={isDarkMode}
        initial={<IconMoonStars {...iconStyles} />}
        final={<IconSun {...iconStyles} />}
      />
    </ActionIcon>
  ) : (
    <ThemeIcon variant="outline" size="md">
      <Loader size={size} type="dots" />
    </ThemeIcon>
  );
};

export default ThemeSwitcher;
