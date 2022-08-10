import '../styles/global.css';

import type { AppProps } from 'next/app';

import { AuthContextProvider } from '../contexts/AuthContext';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <AuthContextProvider>
    <Component {...pageProps} />
  </AuthContextProvider>
);

export default MyApp;
