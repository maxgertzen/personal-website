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
    default: 'Max Gertzen | Senior Full-Stack Engineer - AI Integration',
    template: '%s | Max Gertzen',
  },
  description:
    'Max Gertzen - senior full-stack engineer building AI-integrated products: LLM apps, agent systems, and edge infrastructure in TypeScript, Node, and .NET. Senior and contract work via Greatwhale Solutions.',
  keywords: [
    'Senior Full-Stack Engineer',
    'AI Integration Engineer',
    'LLM Integration',
    'OpenAI API',
    'Anthropic',
    'AI Agents',
    'React',
    'Next.js',
    'Node.js',
    'TypeScript',
    '.NET',
    'Software Engineer',
    'Software Contractor',
    'Max Gertzen',
  ],
  authors: [{ name: 'Max Gertzen', url: 'https://maxgertzen.com' }],
  creator: 'Max Gertzen',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://maxgertzen.com',
    siteName: 'Max Gertzen',
    title: 'Max Gertzen | Senior Full-Stack Engineer - AI Integration',
    description:
      'Senior full-stack engineer building AI-integrated products: LLM apps, agent systems, and edge infrastructure in TypeScript, Node, and .NET. Senior and contract work via Greatwhale Solutions.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Max Gertzen | Senior Full-Stack Engineer - AI Integration',
    description:
      'Senior full-stack engineer building AI-integrated products: LLM apps, agent systems, and edge infrastructure in TypeScript, Node, and .NET. Senior and contract work via Greatwhale Solutions.',
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
