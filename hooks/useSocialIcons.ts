import { useLocalStorage } from '@mantine/hooks';
import { useEffect } from 'react';
import { AllSocialLinks } from '../groq/queries';
import { insert } from '../helpers';
import projectConfig from '../lib/project.config';
import { SocialLink } from '../schema';
import useSanityFetch from './useSanityFetch';

const sourceCodeLink: SocialLink = {
  _type: 'socialLink',
  link: 'https://github.com/ickynavigator/portfolio-sanity-client',
  name: 'Site Source Code',
  iconName: 'Code',
};
const KEY = 'SOCIALICONS';
const postItems: SocialLink[] = [];
if (projectConfig.showOriginalSourceLink) {
  postItems.push(sourceCodeLink);
}

const useSocialIcons = () => {
  const [socialLinks, loading] = useSanityFetch<SocialLink[]>(AllSocialLinks);
  const [links, setLinks] = useLocalStorage({
    key: KEY,
    defaultValue: insert(
      projectConfig.defaultSocialLinks,
      Math.floor(projectConfig.defaultSocialLinks.length / 2),
      ...postItems,
    ),
  });

  useEffect(() => {
    if (!loading && socialLinks) {
      setLinks(
        insert(socialLinks, Math.floor(socialLinks.length / 2), ...postItems),
      );
    }
  }, [socialLinks, loading, setLinks]);

  return [links] as const;
};

export default useSocialIcons;
