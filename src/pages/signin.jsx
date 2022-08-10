import { Meta } from "@/layouts/Meta.tsx";
import { Main } from "@/templates/Main.tsx";
import { GoogleButton } from "react-google-button";
import { useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useRouter } from "next/router";
import { UserAuth } from "../contexts/AuthContext";

const Signin = () => {
  const { googleSignIn, user } = UserAuth();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      // Redirect to profile page
      router.push("/profile");
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
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="flex flex-col p-16 bg-gray-100 rounded-3xl shadow-xl">
          {!user?.uid ? (
            <>
              <img
                className="block h-36 object-none"
                src="https://disadus-ht2rdc24j-icedtet.vercel.app/_next/image?url=%2Flogo.png&w=128&q=100"
                alt="Logo"
              />
              <h1 className="font-bold font-display text-2xl text-center text-gray-750 mb-8">
                Course Companion
              </h1>
              <GoogleButton onClick={handleGoogleSignIn} />
            </>
          ) : (
            <>
              <h1 className="font-bold font-display text-2xl text-center text-gray-750 mb-8">
                Logged in successfully!
              </h1>
              <p className="text-center text-gray-500 text-lg">
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
