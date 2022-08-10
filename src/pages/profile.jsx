import { Meta } from "@/layouts/Meta.tsx";
import { Main } from "@/templates/Main.tsx";
import { GoogleButton } from "react-google-button";
import { useContext } from "react";
import { Helmet } from "react-helmet";
import { useRouter } from "next/router";
import { UserAuth } from "../contexts/AuthContext";

const Profile = () => {
  const router = useRouter();
  const { user, logOut } = UserAuth();
  if (!user) {
    // Redirect to signin page
    router.push("/signin");
  }
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
          {user?.uid ? (
            <div>
              <p>
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="rounded-full mx-auto"
                  referrerpolicy="no-referrer"
                />
              </p>
              <h1 className="font-bold font-display text-2xl text-center text-gray-750 mt-4 mb-8">
                {user.displayName}
              </h1>
              <p>
                Your Name: <strong>{user.displayName}</strong>
              </p>
              <p>
                Your Email: <strong>{user.email}</strong>
              </p>
              <p>
                Your ID:{" "}
                <code className="font-mono text-sm text-gray-800">
                  {user.uid}
                </code>
              </p>
              {!user?.email?.endsWith("@share.epsb.ca") ? (
                <p className="bg-red-200 relative text-red-600 py-3 px-3 rounded-lg mt-4 max-w-sm">
                  <span className="font-semibold text-red-700">Error! 🛑{" "}</span>
                  You're not using your EPSB email.<br />Please log out and try again.<hr className="mx-1 my-4 border-red-600" />We need this to verify your identity as a legitimate EPSB student, not some creepy weirdo lurking on the interwebs 🥸
                </p>
              ) : (
                <p className="bg-green-200 relative text-green-600 py-3 px-3 rounded-lg mt-4 max-w-sm">
                  <span className="font-semibold text-green-700">
                    Congratulations! 🥳{" "}
                  </span>
                  You're using your EPSB email.<hr className="mx-1 my-4 border-green-600" />
                  This helps identify you as a legitimate EPSB student, not some creepy weirdo lurking on the interwebs 🥸
                </p>
              )}
              <div className="flex justify-end mt-8">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={logOut}
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h1 className="font-bold font-display text-2xl text-center text-gray-750 mb-8">
                You are not logged in
              </h1>
              <p className="text-center text-gray-500 text-lg">
                Redirecting you to the login page...
              </p>
            </div>
          )}
        </div>
      </div>
    </Main>
  );
};

export default Profile;
