import { useRouter } from 'next/router';
import { useEffect } from 'react';
import GoogleButton from 'react-google-button';
import { Helmet } from 'react-helmet';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

import { UserAuth } from '../contexts/AuthContext';

const Signin = () => {
  const { googleSignIn, user } = UserAuth();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      // Redirect to profile page
      router.push('/profile');
    }
  }, []);
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Main meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />}>
      <Helmet>
        <style>{`
          html, body {
            background: #212121;
          }
        `}</style>
      </Helmet>
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="flex flex-col rounded-3xl bg-gray-100 p-16 shadow-xl">
          {!user?.uid ? (
            <>
              <img
                className="block h-36 object-none"
                src="https://disadus-ht2rdc24j-icedtet.vercel.app/_next/image?url=%2Flogo.png&w=128&q=100"
                alt="Logo"
              />
              <h1 className="mb-8 text-center font-display text-2xl font-bold text-gray-750">
                Course Companion
              </h1>
              <GoogleButton onClick={handleGoogleSignIn} />
            </>
          ) : (
            <>
              <h1 className="mb-8 text-center font-display text-2xl font-bold text-gray-750">
                Logged in successfully!
              </h1>
              <p className="text-center text-lg text-gray-500">
                Redirecting you to the profile page...
              </p>
            </>
          )}
        </div>
      </div>
    </Main>
  );
};

export default Signin;
