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
  title: 'Max Gertzen',
  icons: { icon: '/favicon.png' },
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
