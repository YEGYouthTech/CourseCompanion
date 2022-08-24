import '../styles/global.css';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';

import { Meta } from '@/layouts/Meta';
import AppMain from '@/templates/AppMain';

import { AuthContextProvider } from '../contexts/AuthContext';
import ProtectedRoute from '../lib/ProtectedRoute';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const noAuthRequired = ['/'];
  return (
    <>
      <Toaster position="bottom-right" />
      <AuthContextProvider>
        {noAuthRequired.includes(router.pathname) ? (
          <Component {...pageProps} />
        ) : (
          <ProtectedRoute requiresLogIn={router.pathname !== '/signin'}>
            {router.pathname.startsWith('/app') ? (
              <AppMain
                meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />}
              >
                <Component {...pageProps} />
              </AppMain>
            ) : (
              <Component {...pageProps} />
            )}
          </ProtectedRoute>
        )}
      </AuthContextProvider>
    </>
  );
};

export default MyApp;
