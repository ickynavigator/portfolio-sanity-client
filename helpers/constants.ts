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
  name: 'Site Source Code',
  iconName: 'Code',
};

export const defaultSocialLinks: SocialLink[] = [
  {
    _type: 'socialLink',
    link: 'https://github.com/ickynavigator',
    name: 'Github',
    iconName: 'Github',
  },
  {
    _type: 'socialLink',
    link: 'https://twitter.com/obifortunebleh',
    name: 'Twitter',
    iconName: 'Twitter',
  },
  {
    _type: 'socialLink',
    link: 'https://www.linkedin.com/in/obifortune/ ',
    name: 'LinkedIn',
    iconName: 'LinkedIn',
  },
  {
    _type: 'socialLink',
    link: 'https://www.facebook.com/obi.fortune2',
    name: 'Facebook',
    iconName: 'Facebook',
  },
];

export const mailInfo = {
  from: 'me@obifortune.tech',
  to: 'gabrielobi.of@gmail.com',
} as const;
