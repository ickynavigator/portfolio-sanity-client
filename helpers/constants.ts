import { SocialLink } from '../schema';

export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const sourceCodeLink: SocialLink = {
  _type: 'socialLink',
  link: 'https://github.com/ickynavigator/portfolio-sanity-client',
  name: 'Code',
};

export const defaultSocialLinks: SocialLink[] = [
  {
    _type: 'socialLink',
    link: 'https://github.com/ickynavigator',
    name: 'Github',
  },
  {
    _type: 'socialLink',
    link: 'https://twitter.com/obifortunebleh',
    name: 'Twitter',
  },
  {
    _type: 'socialLink',
    link: 'https://www.linkedin.com/in/obifortune/ ',
    name: 'LinkedIn',
  },
  {
    _type: 'socialLink',
    link: 'https://www.facebook.com/obi.fortune2',
    name: 'Facebook',
  },
];
