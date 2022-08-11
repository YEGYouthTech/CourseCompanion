import { useRouter } from 'next/router';
import { useEffect } from 'react';

import Loading from '@/components/Loading';
import { useAuth } from '@/contexts/AuthContext';

type IProtectedRouteProps = {
  children: React.ReactNode;
  requiresLogIn?: boolean;
};

export default function ProtectedRoute({
  children,
  requiresLogIn,
}: IProtectedRouteProps): React.ReactNode {
  if (requiresLogIn === undefined) {
    // eslint-disable-next-line no-param-reassign
    requiresLogIn = true;
  }
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user && requiresLogIn && router.pathname !== '/signin') {
      // Redirect
      router.push('/signin');
    } else if (user && !requiresLogIn) {
      // Redirect
      router.push('/profile');
    }
  }, [router, user]);
  return (
    <>{user?.uid || router.pathname === '/signin' ? children : <Loading />}</>
  );
}
