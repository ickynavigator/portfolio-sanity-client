import { ActionIcon, Tooltip as MantineTooltip } from '@mantine/core';
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
// import Tooltip from './Tooltip';

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
      <div className="flex justify-center m-3">
        {!loading &&
          updatedSocialLinks?.map(({ name, link, iconName }) => (
            <MantineTooltip key={name} label={name}>
              <Link
                href={link}
                aria-label={name}
                passHref
                // className="p-1 mx-2 text-3xl text-gray-500 rounded cursor-pointer hover:bg-gray-500 hover:text-white"
              >
                <ActionIcon
                  variant="subtle"
                  sx={theme => ({
                    '&:hover': {
                      backgroundColor:
                        theme.colorScheme === 'dark'
                          ? theme.colors.gray[0]
                          : theme.colors.dark[6],
                      color:
                        theme.colorScheme === 'dark'
                          ? theme.colors.dark[7]
                          : theme.colors.gray[0],
                    },
                  })}
                >
                  {SocialLinksIcons(iconName)}
                </ActionIcon>
              </Link>
            </MantineTooltip>
          ))}
      </div>
    </footer>
  );
};

export default Footer;
