import { SocialLink } from '../schema';

const defaultSocialLinks: SocialLink[] = [
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

const config = {
  name: 'Obi Fortune',
  /** Should the original source code be shown in the portfolio */
  showOriginalSourceLink: true,
  /** Can leave `from` and `to` as empty strings if SMTP is not setup */
  mailInfo: { from: 'me@obifortune.tech', to: 'gabrielobi.of@gmail.com' },
  /** Social Links to be displayed before the fetch from the sanity */
  defaultSocialLinks,
  /** Show career page link */
  showCareerLink: false,
  /** Show certificates page link */
  showCertificateLink: false,
};

export default config;
