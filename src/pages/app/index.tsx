import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { TbCalendarPlus, TbSettings, TbUserSearch } from 'react-icons/tb';

import { useAuth } from '@/contexts/AuthContext';

import Loader from '../../components/Loader';

const AppIndex = () => {
  const [readyState, setReadyState] = useState(0);

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setReadyState(1);
    }
    async function checkReadyState() {
      try {
        // Read the user by id
        const request = await fetch(`/api/users/${user?.uid}`, {
          headers: {
            Authorization: `${await user?.getIdToken()}`,
          },
        });
        if (request.status !== 200) {
          throw new Error(
            `Received error HTTP status code ${request.status} ${request.statusText}`
          );
        }
        const json = await request.json();
        if (!request.ok || json?.error !== undefined) {
          throw new Error(json?.error || 'Unknown error');
        }
        setReadyState(2);
        if (json?.timetable) {
          setReadyState(3);
        }
      } catch (err) {}
    }

    checkReadyState();
  }, [user]);

  return (
    <>
      <Helmet>
        <style>{`
      html, body {
        // background: rgba(25,24,31,1);
        background: #18181b;
      }
    `}</style>
      </Helmet>
      <section className="mx-auto w-full max-w-screen-xl px-4 pt-4 leading-6 text-black sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-xl text-center md:max-w-2xl lg:max-w-3xl">
          <p className="m-0 inline-flex items-center justify-center rounded-t-full rounded-r-full bg-gradient-to-r from-[#333139] to-[#23202a] py-2 px-6 text-sm font-medium leading-5 tracking-wide text-white">
            Get Started
          </p>
          <h2 className="mx-0 mt-6 mb-0 text-3xl font-extrabold leading-9 text-white sm:text-4xl sm:leading-10 md:text-5xl md:leading-none">
            Using{' '}
            <span className="animate-gradient-slow bg-gradient-to-r from-primary-500 via-blue-500 to-primary-500 bg-clip-text !text-transparent">
              CoCo
            </span>{' '}
            ❤️
          </h2>
          <p className="mx-0 mt-6 mb-0 text-xl leading-7 text-gray-400">
            This quick guide will help you get started with CoCo.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-xl gap-10 text-black lg:mt-16 lg:max-w-none lg:grid-cols-3">
          <div className="w-full">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-r from-[#333139] to-[#23202a] shadow-sm">
              <TbSettings className="block h-10 w-10 align-middle text-gray-400" />
            </span>
            <h3 className="mx-0 mt-5 mb-0 text-center text-2xl font-semibold leading-8 text-white">
              1. Settings
            </h3>
            <p className="mx-0 mt-2 mb-0 text-center text-lg leading-relaxed text-gray-400">
              Go to the{' '}
              <a href="/profile" className="text-primary-500 underline">
                settings page
              </a>{' '}
              to set your{' '}
              <span className="font-bold text-yellow-500/[.87]">school</span>{' '}
              and <span className="font-bold text-yellow-500/[.87]">grade</span>
              . You must be from{' '}
              <span className="font-bold text-white/[.87]">
                Old Scona Academic
              </span>
              . The app will not be operational until you do this.
            </p>
          </div>
          <div className="w-full">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-r from-[#333139] to-[#23202a] shadow-sm">
              <TbCalendarPlus className="block h-10 w-10 align-middle text-gray-400" />
            </span>
            <h3 className="mx-0 mt-5 mb-0 text-center text-2xl font-semibold leading-8 text-white">
              2. Timetable
            </h3>
            <p className="mx-0 mt-2 mb-0 text-center text-lg leading-relaxed text-gray-400">
              Go to the{' '}
              <a href="/profile" className="text-primary-500 underline">
                timetable page
              </a>{' '}
              to set your{' '}
              <span className="font-bold text-yellow-500/[.87]">timetable</span>
              . Follow the link to your complete timetable on SchoolZone. Select
              all the text and copy paste it into the text box. Your timetable
              will be automatically processed.
            </p>
          </div>
          <div className="w-full">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-r from-[#333139] to-[#23202a] shadow-sm">
              <TbUserSearch className="block h-10 w-10 align-middle text-gray-400" />
            </span>
            <h3 className="mx-0 mt-5 mb-0 text-center text-2xl font-semibold leading-8 text-white">
              3. Groups
            </h3>
            <p className="mx-0 mt-2 mb-0 text-center text-lg leading-relaxed text-gray-400">
              To compare timetables, join any{' '}
              <span className="font-bold text-yellow-500/[.87]">group</span>{' '}
              that you've been invited to, or create a new group and invite your
              friends. You can use the app to select which group you want to
              compare timetables with.
            </p>
          </div>
        </div>
      </section>
      <section className="my-16">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold text-white">Your Progress</h2>
          <div className="flex w-full max-w-lg flex-col gap-2">
            <div className="flex flex-row justify-between font-medium text-white/70">
              <p>Account</p>
              <p>Settings</p>
              <p>Timetable</p>
            </div>
            <div className="flex w-full rounded-full bg-white/40">
              <div
                className={
                  readyState === 1
                    ? 'w-4'
                    : readyState === 2
                    ? 'w-1/2'
                    : 'w-full'
                }
              >
                <Loader full={true} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AppIndex;
