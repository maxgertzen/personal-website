import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { Providers } from '../providers';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
}
