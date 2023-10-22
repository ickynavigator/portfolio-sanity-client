import { useLocalStorage } from '@mantine/hooks';
import { useEffect } from 'react';
import { AllSocialLinks } from '../groq/queries';
import { defaultSocialLinks, insert, sourceCodeLink } from '../helpers';
import { SocialLink } from '../schema';
import useSanityFetch from './useSanityFetch';

export const KEY = 'SOCIALICONS';
const useSocialIcons = () => {
  const [socialLinks, loading] = useSanityFetch<SocialLink[]>(AllSocialLinks);
  const [links, setLinks] = useLocalStorage({
    key: KEY,
    defaultValue: insert(
      defaultSocialLinks,
      Math.floor(defaultSocialLinks.length / 2),
      sourceCodeLink,
    ),
  });

  useEffect(() => {
    if (!loading && socialLinks) {
      setLinks(
        insert(socialLinks, Math.floor(socialLinks.length / 2), sourceCodeLink),
      );
    }
  }, [socialLinks, loading, setLinks]);

  return [links] as const;
};

export default useSocialIcons;
