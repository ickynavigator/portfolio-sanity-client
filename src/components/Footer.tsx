import { ActionIcon, Group, Tooltip } from '@mantine/core';
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconCode,
} from '@tabler/icons-react';
import Link from 'next/link';
import { AllSocialLinks } from '~/groq/queries';
import { insert } from '~/helpers';
import { getClient } from '~/sanity/sanity.server';
import { SocialLink } from '~/schema';
import projectConfig from '../lib/project.config';

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

const getSocialIcons = async (showOGsourceLink: boolean) => {
  const sourceCodeLink: SocialLink = {
    _type: 'socialLink',
    link: 'https://github.com/ickynavigator/portfolio-sanity-client',
    name: 'Site Source Code',
    iconName: 'Code',
  };
  const postItems: SocialLink[] = [];
  if (showOGsourceLink) {
    postItems.push(sourceCodeLink);
  }

  const client = getClient();
  const socialLinks = await client.fetch<SocialLink[]>(AllSocialLinks);
  return insert(socialLinks, Math.floor(socialLinks.length / 2), ...postItems);
};

const Footer = async () => {
  const links = await getSocialIcons(projectConfig.showOriginalSourceLink);

  return (
    <footer>
      <Group align="center" mb="lg">
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
