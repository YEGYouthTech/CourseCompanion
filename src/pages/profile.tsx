import { useState } from 'react';
import { Helmet } from 'react-helmet';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

import SetTimetableModal from '../components/SetTimetableModal';
import SettingsModal from '../components/SettingsModal';
import { useAuth } from '../contexts/AuthContext';

export default function Profile(): React.ReactNode {
  const { user, logOut } = useAuth();
  const timetableModalState = useState(false);
  const settingsModalState = useState(false);
  user?.getIdToken()?.then(console.warn);
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
          {user?.uid ? (
            <div>
              <p>
                <img
                  src={user.photoURL || undefined}
                  alt="Profile"
                  className="mx-auto rounded-full"
                  referrerPolicy="no-referrer"
                />
              </p>
              <h1 className="mt-4 mb-8 text-center font-display text-2xl font-bold text-gray-750">
                {user.displayName}
              </h1>
              <p>
                Your Name: <strong>{user.displayName}</strong>
              </p>
              <p>
                Your Email: <strong>{user.email}</strong>
              </p>
              <p>
                Your ID:{' '}
                <code className="text-sm text-gray-800">{user.uid}</code>
              </p>
              {!user?.email?.endsWith('@share.epsb.ca') ? (
                <p className="relative mt-4 max-w-sm rounded-lg bg-red-200 p-3 text-red-600">
                  <span className="font-semibold text-red-700">Error! 🛑 </span>
                  You&apos;re not using your EPSB email.
                  <br />
                  Please log out and try again.
                  <hr className="mx-1 my-4 border-red-600" />
                  We need this to verify your identity as a legitimate EPSB
                  student, not some creepy weirdo lurking on the interwebs 🥸
                </p>
              ) : (
                <p className="relative mt-4 max-w-sm rounded-lg bg-green-200 p-3 text-green-600">
                  <span className="font-semibold text-green-700">
                    Congratulations! 🥳{' '}
                  </span>
                  You&apos;re using your EPSB email.
                  <hr className="mx-1 my-4 border-green-600" />
                  This helps identify you as a legitimate EPSB student, not some
                  creepy weirdo lurking on the interwebs 🥸
                </p>
              )}
              <div className="mt-8 flex justify-end gap-2">
                <button
                  className="rounded-md bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                  onClick={() => timetableModalState[1](true)}
                >
                  Set Timetable
                </button>
                <button
                  className="rounded-md bg-emerald-500 py-2 px-4 font-bold text-white hover:bg-emerald-700"
                  onClick={() => settingsModalState[1](true)}
                >
                  Settings
                </button>
                <button
                  className="rounded-md bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700"
                  onClick={logOut}
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h1 className="mb-8 text-center font-display text-2xl font-bold text-gray-750">
                You are not logged in
              </h1>
              <p className="text-center text-lg text-gray-500">
                Redirecting you to the login page...
              </p>
            </div>
          )}
        </div>
      </div>
      <SetTimetableModal state={timetableModalState} />
      <SettingsModal state={settingsModalState} />
    </Main>
  );
}
