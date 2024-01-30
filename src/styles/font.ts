import { Bricolage_Grotesque as BricolageGrotesque } from 'next/font/google';

export const bricolageGrotesque = BricolageGrotesque({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: false,
  preload: true,
});

export default {};
