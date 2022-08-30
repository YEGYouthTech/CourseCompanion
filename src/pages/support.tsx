import { Disclosure } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { HiChevronUp as ChevronUpIcon } from 'react-icons/hi';
import { TbCalendarPlus, TbSettings, TbUserSearch } from 'react-icons/tb';

import { useAuth } from '@/contexts/AuthContext';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Support = () => {
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
    <Main
      meta={
        <Meta title="Support | Course Companion" description="Lorem ipsum" />
      }
    >
      <Helmet>
        <style>{`
          html, body {
            // background: rgba(25,24,31,1);
            background: #18181b;
          }
        `}</style>
      </Helmet>
      <section className="mx-auto mt-16 w-full max-w-screen-xl px-4 pt-4 leading-6 text-black sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-xl text-center md:max-w-2xl lg:max-w-3xl">
          <p className="m-0 inline-flex items-center justify-center rounded-t-full rounded-r-full bg-gradient-to-r from-[#333139] to-[#23202a] py-2 px-6 text-sm font-medium leading-5 tracking-wide text-white">
            Support
          </p>
          <h2 className="mx-0 mt-6 mb-0 text-3xl font-extrabold leading-9 text-white sm:text-4xl sm:leading-10 md:text-5xl md:leading-none">
            Getting help with{' '}
            <span className="animate-gradient-slow bg-gradient-to-r from-primary-500 via-blue-500 to-primary-500 bg-clip-text !text-transparent">
              CoCo
            </span>{' '}
            ❤️
          </h2>
          <p className="mx-0 mt-6 mb-0 text-xl leading-7 text-gray-400">
            We love helping you.
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
              . Follow{' '}
              <a
                href="https://schoolzone.epsb.ca/cf/profile/Timetable/printPdf.cfm?timetableDate=9,01,22&daylist=false"
                className="text-primary-500 underline"
              >
                the link
              </a>{' '}
              to your complete timetable on SchoolZone. Select all the text and
              copy paste it into the text box. Your timetable will be
              automatically processed.
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
          <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
          <div className="w-max px-4 grid grid-cols-3">
            <div className="mx-0 w-full max-w-md rounded-2xl bg-transparent p-2">
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-teal-100 px-4 py-2 text-center text-sm font-medium text-teal-1000 hover:bg-teal-200 focus:outline-none focus-visible:ring focus-visible:ring-teal-500 focus-visible:ring-opacity-75 my-4">
                      <span>What is a block and what is a period?</span>
                      <ChevronUpIcon
                        className={`${
                          open ? 'rotate-180' : ''
                        } h-5 w-5 text-teal-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-2 pb-2 text-sm text-teal-1000 bg-teal-100 rounded-lg mt-1">
                      A block is when courses can be scheduled. A period is when the blocks are. It is easier to explain with an example. At OSA, there are 12 blocks. Say that you have block 1, you take French 10. Block 1 is on 1st period Mondays and Wednesdays. So, on the 1st period of Mondays and Wednesdays, you will be attending French 10.
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>

              <Disclosure as="div" className="mt-2">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-teal-100 px-4 py-2 text-center text-sm font-medium text-teal-1000 hover:bg-teal-200 focus:outline-none focus-visible:ring focus-visible:ring-teal-500 focus-visible:ring-opacity-75 my-4">
                      <span>My timetable changed! What should I do?</span>
                      <ChevronUpIcon
                        className={`${
                          open ? 'rotate-180' : ''
                        } h-5 w-5 text-teal-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-2 pb-2 text-sm text-teal-1000 bg-teal-100 rounded-lg mt-1">
                      If your timetable changes, you can resubmit your timetable and everything will update.
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>

              <Disclosure as="div" className="mt-2">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-teal-100 px-4 py-2 text-center text-sm font-medium text-teal-1000 hover:bg-teal-200 focus:outline-none focus-visible:ring focus-visible:ring-teal-500 focus-visible:ring-opacity-75 my-4">
                      <span>Can anyone see my information?</span>
                      <ChevronUpIcon
                        className={`${
                          open ? 'rotate-180' : ''
                        } h-5 w-5 text-teal-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-2 pb-2 text-sm text-teal-1000 bg-teal-100 rounded-lg mt-1">
                      Only people in your group will see your timetable. If you want to share your timetable with other people, you must join or create a group with them. Furthermore, the YegYouth.Tech team will not be able to see your data as it is encrypted. I think.
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>

              <Disclosure as="div" className="mt-2">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-teal-100 px-4 py-2 text-center text-sm font-medium text-teal-1000 hover:bg-teal-200 focus:outline-none focus-visible:ring focus-visible:ring-teal-500 focus-visible:ring-opacity-75 my-4">
                      <span>I'm from a school other than OSA. Can I still use the app?</span>
                      <ChevronUpIcon
                        className={`${
                          open ? 'rotate-180' : ''
                        } h-5 w-5 text-teal-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-2 pb-2 text-sm text-teal-1000 bg-teal-100 rounded-lg mt-1">
                      Unfortunately, only OSA is supported currently, but there are plans to add more schools.
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
            <div className="mx-0 w-full max-w-md rounded-2xl bg-transparent p-2">
              <Disclosure as="div" className="mt-2">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-teal-100 px-4 py-2 text-center text-sm font-medium text-teal-1000 hover:bg-teal-200 focus:outline-none focus-visible:ring focus-visible:ring-teal-500 focus-visible:ring-opacity-75 my-4">
                      <span>I have a course in my timetable that is not supported by YEGYouth.tech. What should I do?</span>
                      <ChevronUpIcon
                        className={`${
                          open ? 'rotate-180' : ''
                        } h-5 w-5 text-teal-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-2 pb-2 text-sm text-teal-1000 bg-teal-100 rounded-lg mt-1">
                      Courses that are not in our database are shown as “EDGE” classes. They will be added later on. If you have a course that is not in our database, you can contact Oliver at o.chen@share.epsb.ca.  
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>

              <Disclosure as="div" className="mt-2">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-teal-100 px-4 py-2 text-center text-sm font-medium text-teal-1000 hover:bg-teal-200 focus:outline-none focus-visible:ring focus-visible:ring-teal-500 focus-visible:ring-opacity-75 my-4">
                      <span>Are you stealing my data?</span>
                      <ChevronUpIcon
                        className={`${
                          open ? 'rotate-180' : ''
                        } h-5 w-5 text-teal-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-2 pb-2 text-sm text-teal-1000 bg-teal-100 rounded-lg mt-1">
                        The person writing this FAQ does not know, but he can probably guess that the answer is no.
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>

              <Disclosure as="div" className="mt-2">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-teal-100 px-4 py-2 text-center text-sm font-medium text-teal-1000 hover:bg-teal-200 focus:outline-none focus-visible:ring focus-visible:ring-teal-500 focus-visible:ring-opacity-75 my-4">
                      <span>When is the full version coming out?</span>
                      <ChevronUpIcon
                        className={`${
                          open ? 'rotate-180' : ''
                        } h-5 w-5 text-teal-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-2 pb-2 text-sm text-teal-1000 bg-teal-100 rounded-lg mt-1">
                      Soon, babe. :)
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>

              <Disclosure as="div" className="mt-2">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-teal-100 px-4 py-2 text-center text-sm font-medium text-teal-1000 hover:bg-teal-200 focus:outline-none focus-visible:ring focus-visible:ring-teal-500 focus-visible:ring-opacity-75 my-4">
                      <span>My timetable is not being accepted. Help!</span>
                      <ChevronUpIcon
                        className={`${
                          open ? 'rotate-180' : ''
                        } h-5 w-5 text-teal-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-2 pb-2 text-sm text-teal-1000 bg-teal-100 rounded-lg mt-1">
                      Make sure you are copy pasting everything in the pdf the link directed you to, and try again. If that does not work, try contacting Oliver at o.chen@share.epsb.ca. Timetables will be checked to make sure that it is for the right semester and that they are valid.
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>

              <Disclosure as="div" className="mt-2">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-teal-100 px-4 py-2 text-center text-sm font-medium text-teal-1000 hover:bg-teal-200 focus:outline-none focus-visible:ring focus-visible:ring-teal-500 focus-visible:ring-opacity-75 my-4">
                      <span>It says that my timetable does not have a valid date line. What should I do?</span>
                      <ChevronUpIcon
                        className={`${
                          open ? 'rotate-180' : ''
                        } h-5 w-5 text-teal-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-2 pb-2 text-sm text-teal-1000 bg-teal-100 rounded-lg mt-1">
                      You could try inserting an “enter” right after the name of your school. That should fix it, but you could also try recopying and repasting the timetable.
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
            <div className="mx-auto w-full max-w-md rounded-2xl bg-transparent p-2">
          

              <Disclosure as="div" className="mt-2">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-teal-100 px-4 py-2 text-center text-sm font-medium text-teal-1000 hover:bg-teal-200 focus:outline-none focus-visible:ring focus-visible:ring-teal-500 focus-visible:ring-opacity-75 my-4">
                      <span>How do I join a group?</span>
                      <ChevronUpIcon
                        className={`${
                          open ? 'rotate-180' : ''
                        } h-5 w-5 text-teal-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-2 pb-2 text-sm text-teal-1000 bg-teal-100 rounded-lg mt-1">
                        You can either accept invitations from other people or create your own group. To create a group, go into your profile and press ‘Groups’, and then press “Create Group”. 
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>

              <Disclosure as="div" className="mt-2">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-teal-100 px-4 py-2 text-center text-sm font-medium text-teal-1000 hover:bg-teal-200 focus:outline-none focus-visible:ring focus-visible:ring-teal-500 focus-visible:ring-opacity-75 my-4">
                      <span>How can I join the team?</span>
                      <ChevronUpIcon
                        className={`${
                          open ? 'rotate-180' : ''
                        } h-5 w-5 text-teal-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-2 pb-2 text-sm text-teal-1000 bg-teal-100 rounded-lg mt-1">
                      Email Oliver at o.chen@share.epsb.ca if you are interested.
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>

              <Disclosure as="div" className="mt-2">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-teal-100 px-4 py-2 text-center text-sm font-medium text-teal-1000 hover:bg-teal-200 focus:outline-none focus-visible:ring focus-visible:ring-teal-500 focus-visible:ring-opacity-75 my-4">
                      <span>How can I report bugs?</span>
                      <ChevronUpIcon
                        className={`${
                          open ? 'rotate-180' : ''
                        } h-5 w-5 text-teal-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-2 pb-2 text-sm text-teal-1000 bg-teal-100 rounded-lg mt-1">
                      Email Oliver at o.chen@share.epsb.ca if you have found a bug.
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>

              <Disclosure as="div" className="mt-2">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-teal-100 px-4 py-2 text-center text-sm font-medium text-teal-1000 hover:bg-teal-200 focus:outline-none focus-visible:ring focus-visible:ring-teal-500 focus-visible:ring-opacity-75 my-4">
                      <span>How can I request features?</span>
                      <ChevronUpIcon
                        className={`${
                          open ? 'rotate-180' : ''
                        } h-5 w-5 text-teal-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-2 pb-2 text-sm text-teal-1000 bg-teal-100 rounded-lg mt-1">
                      Email Oliver at o.chen@share.epsb.ca if you have any suggestions.
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
          </div>
        </div>
      </section>
    </Main>
  );
};

export default Support;
