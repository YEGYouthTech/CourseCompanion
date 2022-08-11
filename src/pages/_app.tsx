import '../styles/global.css';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import { AuthContextProvider } from '../contexts/AuthContext';
import ProtectedRoute from '../lib/ProtectedRoute';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const noAuthRequired = ['/'];
  return (
    <AuthContextProvider>
      {noAuthRequired.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <ProtectedRoute requiresLogIn={router.pathname !== '/signin'}>
          <Component {...pageProps} />
        </ProtectedRoute>
      )}
    </AuthContextProvider>
  );
};

export default MyApp;
