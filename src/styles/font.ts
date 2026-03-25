import { Roboto, Sarabun, Aclonica } from 'next/font/google';

export const roboto = Roboto({
  weight: ['600', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

export const saraban = Sarabun({
  weight: ['400', '500'],
  subsets: ['thai'],
  variable: '--font-saraban',
});

export const aclonica = Aclonica({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-aclonica',
});
