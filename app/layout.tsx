import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Providers } from '../providers';
import '../styles/globals.css';

const josefinSans = localFont({
  src: [
    { path: '../public/fonts/JosefinSans-Thin.ttf', weight: '100' },
    { path: '../public/fonts/JosefinSans-ExtraLight.ttf', weight: '200' },
    { path: '../public/fonts/JosefinSans-Light.ttf', weight: '300' },
    { path: '../public/fonts/JosefinSans-Regular.ttf', weight: '400' },
    { path: '../public/fonts/JosefinSans-Medium.ttf', weight: '500' },
    { path: '../public/fonts/JosefinSans-Bold.ttf', weight: '700' },
  ],
  variable: '--font-josefin-sans',
  display: 'swap',
});

const majorMono = localFont({
  src: '../public/fonts/MajorMonoDisplay-Regular.ttf',
  variable: '--font-major-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://maxgertzen.com'),
  title: {
    default: 'Max Gertzen | Full-Stack Developer',
    template: '%s | Max Gertzen',
  },
  description:
    'Max Gertzen — Full-Stack Developer specializing in React, Next.js, Node.js and .NET. Bridging the gap between ideas and digital reality.',
  keywords: [
    'Full-Stack Developer',
    'React',
    'Next.js',
    'Node.js',
    '.NET',
    'TypeScript',
    'JavaScript',
    'Web Developer',
    'Software Engineer',
    'Max Gertzen',
  ],
  authors: [{ name: 'Max Gertzen', url: 'https://maxgertzen.com' }],
  creator: 'Max Gertzen',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://maxgertzen.com',
    siteName: 'Max Gertzen',
    title: 'Max Gertzen | Full-Stack Developer',
    description:
      'Full-Stack Developer specializing in React, Next.js, Node.js and .NET. Bridging the gap between ideas and digital reality.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Max Gertzen | Full-Stack Developer',
    description:
      'Full-Stack Developer specializing in React, Next.js, Node.js and .NET. Bridging the gap between ideas and digital reality.',
  },
  alternates: {
    canonical: 'https://maxgertzen.com',
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${josefinSans.variable} ${majorMono.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
