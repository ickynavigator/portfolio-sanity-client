import { MantineThemeOverride } from '@mantine/core';
import { bricolageGrotesque } from '../styles/font';

const config: MantineThemeOverride = {
  fontFamily: `${bricolageGrotesque.style.fontFamily}, sans-serif`,
  colors: {
    brand: [
      '#F56E0F',
      '#151419',
      '#1B1B1E',
      '#262626',
      '#878787',
      '#FBFBFB',
      '#F56E0F',
      '#F56E0F',
      '#F56E0F',
      '#F56E0F',
    ],
  },
  // primaryColor: 'brand',
};

export default config;
