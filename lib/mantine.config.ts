import { MantineThemeOverride } from '@mantine/core';
import { bricolageGrotesque } from '../styles/font';

const config: MantineThemeOverride = {
  fontFamily: `${bricolageGrotesque.style.fontFamily}, sans-serif`,
};

export default config;
