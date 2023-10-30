import { ActionIcon, Group, Tooltip } from '@mantine/core';
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconCode,
} from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';
import { useSocialIcons } from '../hooks';

const SocialLinksIcons = (name: string) => {
  switch (name) {
    case 'Facebook':
      return <IconBrandFacebook />;
    case 'Github':
      return <IconBrandGithub />;
    case 'LinkedIn':
      return <IconBrandLinkedin />;
    case 'Twitter':
      return <IconBrandTwitter />;
    case 'Code':
      return <IconCode />;
    default:
      return `${name}`.charAt(0).toUpperCase();
  }
};

const Footer: React.FC = () => {
  const [links] = useSocialIcons();

  return (
    <footer>
      <Group position="center">
        {links.map(({ name, link, iconName }) => (
          <Tooltip key={name} label={name} withArrow>
            <Link href={link} passHref>
              <ActionIcon variant="subtle">
                {SocialLinksIcons(iconName)}
              </ActionIcon>
            </Link>
          </Tooltip>
        ))}
      </Group>
    </footer>
  );
};

export default Footer;
