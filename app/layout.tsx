import type { Metadata } from 'next';
import { Bebas_Neue, Space_Grotesk } from 'next/font/google';
import './globals.css';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-grotesque',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'bluetoothboys — New band. Same frequency.',
  description:
    'bluetoothboys is a new band built on good vibes, loud sound and full energy. Three friends, one frequency. Debut single READY TO PAIR — out soon.',
  openGraph: {
    title: 'bluetoothboys',
    description: 'New band. Same frequency.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${bebasNeue.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
