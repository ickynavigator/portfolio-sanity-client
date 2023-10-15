import { ActionIcon, Group, Tooltip } from '@mantine/core';
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconCode,
} from '@tabler/icons-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AllSocialLinks } from '../groq/queries';
import { defaultSocialLinks, insert, sourceCodeLink } from '../helpers';
import { useSanityFetch } from '../hooks';
import { SocialLink } from '../schema';

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
  const [socialLinks, loading] = useSanityFetch<SocialLink[]>(
    AllSocialLinks,
    defaultSocialLinks,
  );
  const [updatedSocialLinks, setUpdatedSocialLinks] = useState(socialLinks);
  useEffect(() => {
    if (!loading && socialLinks) {
      setUpdatedSocialLinks(
        insert(socialLinks, Math.floor(socialLinks.length / 2), sourceCodeLink),
      );
    }
  }, [socialLinks, loading]);

  return (
    <footer>
      <Group position="center">
        {!loading &&
          updatedSocialLinks?.map(({ name, link, iconName }) => (
            <Tooltip key={name} label={name}>
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
