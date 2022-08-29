import Link from 'next/link';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { HiOutlineQuestionMarkCircle as QuestionMarkCircleIcon } from 'react-icons/hi';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

import GroupsModal from '../components/modals/GroupsModal';
import SetTimetableModal from '../components/modals/SetTimetableModal';
import SettingsModal from '../components/modals/SettingsModal';
import { useAuth } from '../contexts/AuthContext';

export default function Profile(): React.ReactNode {
  const { user, logOut } = useAuth();
  const groupsModalState = useState(false);
  const timetableModalState = useState(false);
  const settingsModalState = useState(false);
  user?.getIdToken()?.then(console.warn);
  return (
    <Main
      meta={
        <Meta title="Profile | Course Companion" description="Lorem ipsum" />
      }
    >
      <Helmet>
        <style>{`
          html, body {
            background: #212121;
          }
        `}</style>
      </Helmet>
      <div className="mt-16 flex h-screen w-screen items-center justify-center">
        <div className="relative flex flex-col rounded-3xl bg-gray-100 p-16 shadow-xl">
          <div className="absolute inset-x-0 top-0 mx-14 my-8 flex flex-col items-end">
            <Link href="/app">
              <a className="flex h-12 w-12 items-center justify-center text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                <QuestionMarkCircleIcon className="h-8 w-8" />
              </a>
            </Link>
          </div>
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
                </p>
              )}
              <div className="mt-8 flex justify-end gap-2">
                <button
                  className="rounded-md bg-amber-500 py-2 px-4 font-bold text-white hover:bg-amber-700"
                  onClick={() => groupsModalState[1](true)}
                >
                  Groups
                </button>
                <button
                  className="rounded-md bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                  onClick={() => timetableModalState[1](true)}
                >
                  Timetable
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
      <GroupsModal state={groupsModalState} />
      <SetTimetableModal state={timetableModalState} />
      <SettingsModal state={settingsModalState} />
    </Main>
  );
}
