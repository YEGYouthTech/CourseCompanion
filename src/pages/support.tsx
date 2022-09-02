import { Disclosure } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { HiChevronUp as ChevronUpIcon } from 'react-icons/hi';

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
      } catch (err) { }
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
            // background: #18181b;
            background: rgba(25,24,31,1);
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
      </section>
      <section className="mt-16 bg-[#1e1b24] py-16">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold text-white">
            Frequently Asked Questions
          </h2>
          <div className="grid w-max grid-cols-1 px-4 lg:grid-cols-2 xl:grid-cols-3">
            <div className="mx-0 w-full max-w-md rounded-2xl bg-transparent p-2">
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg border-2 border-solid border-gray-800 bg-transparent px-4 py-2 text-sm font-medium text-white focus:outline-none">
                      <span className="font-bold">
                        What is a block and what is a period?
                      </span>
                      <ChevronUpIcon
                        className={`${open ? 'rotate-180' : ''
                          } h-5 w-5 text-teal-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="mt-1 rounded-lg px-4 py-2 text-sm text-white">
                      A block is when courses can be scheduled. A period is when
                      the blocks are. It is easier to explain with an example.
                      At OSA, there are 12 blocks. Say that you have block 1,
                      you take French 10. Block 1 is on 1st period Mondays and
                      Wednesdays. So, on the 1st period of Mondays and
                      Wednesdays, you will be attending French 10.
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>

              <Disclosure as="div" className="mt-2">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="my-4 flex w-full justify-between rounded-lg border-2 border-solid border-gray-800 bg-transparent px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring focus-visible:ring-white focus-visible:ring-opacity-75">
                      <span className="font-bold">
                        My timetable changed! What should I do?
                      </span>
                      <ChevronUpIcon
                        className={`${open ? 'rotate-180' : ''
                          } h-5 w-5 text-teal-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="mt-1 rounded-lg px-4 py-2 text-sm text-white">
                      If your timetable changes, you can resubmit your timetable
                      and everything will update.
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>

              <Disclosure as="div" className="mt-2">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="my-4 flex w-full justify-between rounded-lg border-2 border-solid border-gray-800 bg-transparent px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring focus-visible:ring-white focus-visible:ring-opacity-75">
                      <span className="font-bold">
                        Can anyone see my information?
                      </span>
                      <ChevronUpIcon
                        className={`${open ? 'rotate-180' : ''
                          } h-5 w-5 text-teal-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="mt-1 rounded-lg px-4 py-2 text-sm text-white">
                      Only people in your group will see your timetable. If you
                      want to share your timetable with other people, you must
                      join or create a group with them. Furthermore, the
                      YegYouth.Tech team will not be able to see your data as it
                      is encrypted. I think.
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>

              <Disclosure as="div" className="mt-2">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="my-4 flex w-full justify-between rounded-lg border-2 border-solid border-gray-800 bg-transparent px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring focus-visible:ring-white focus-visible:ring-opacity-75">
                      <span className="font-bold">
                        I'm from a school other than OSA. Can I still use the
                        app?
                      </span>
                      <ChevronUpIcon
                        className={`${open ? 'rotate-180' : ''
                          } h-5 w-5 text-teal-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="mt-1 rounded-lg px-4 py-2 text-sm text-white">
                      Unfortunately, only OSA is supported currently, but there
                      are plans to add more schools.
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>

            <div className="mx-0 w-full max-w-md rounded-2xl bg-transparent p-2">
              <Disclosure as="div" className="mt-2">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="my-4 flex w-full justify-between rounded-lg border-2 border-solid border-gray-800 bg-transparent px-4 py-2 text-left text-sm font-medium text-white focus:outline-none focus-visible:ring focus-visible:ring-white focus-visible:ring-opacity-75">
                      <span className="font-bold">
                        I have a course in my timetable that is not supported by
                        YEGYouth.tech. What should I do?
                      </span>
                      <ChevronUpIcon
                        className={`${open ? 'rotate-180' : ''
                          } h-5 w-5 text-teal-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="mt-1 rounded-lg px-4 py-2 text-sm text-white">
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>

              <Disclosure as="div" className="mt-2">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="my-4 flex w-full justify-between rounded-lg border-2 border-solid border-gray-800 bg-transparent px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring focus-visible:ring-white focus-visible:ring-opacity-75">
                      <span className="font-bold">
                        Are you stealing my data?
                      </span>
                      <ChevronUpIcon
                        className={`${open ? 'rotate-180' : ''
                          } h-5 w-5 text-teal-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="mt-1 rounded-lg px-4 py-2 text-sm text-white">
                      The person writing this FAQ does not know, but he can
                      probably guess that the answer is no.
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>

              <Disclosure as="div" className="mt-2">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="my-4 flex w-full justify-between rounded-lg border-2 border-solid border-gray-800 bg-transparent px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring focus-visible:ring-white focus-visible:ring-opacity-75">
                      <span className="font-bold">
                        When is the full version coming out?
                      </span>
                      <ChevronUpIcon
                        className={`${open ? 'rotate-180' : ''
                          } h-5 w-5 text-teal-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="mt-1 rounded-lg px-4 py-2 text-sm text-white">
                      Soon, babe. :)
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>

              <Disclosure as="div" className="mt-2">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="my-4 flex w-full justify-between rounded-lg border-2 border-solid border-gray-800 bg-transparent px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring focus-visible:ring-white focus-visible:ring-opacity-75">
                      <span className="font-bold">
                        My timetable is not being accepted. Help!
                      </span>
                      <ChevronUpIcon
                        className={`${open ? 'rotate-180' : ''
                          } h-5 w-5 text-teal-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="mt-1 rounded-lg px-4 py-2 text-sm text-white">
                      Make sure you are copy pasting everything in the pdf the
                      link directed you to, and try again. If that does not
                      work, try contacting Oliver at o.chen@share.epsb.ca.
                      Timetables will be checked to make sure that it is for the
                      right semester and that they are valid.
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>

              <Disclosure as="div" className="mt-2">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="my-4 flex w-full justify-between rounded-lg border-2 border-solid border-gray-800 bg-transparent px-4 py-2 text-left text-sm font-medium text-white focus:outline-none focus-visible:ring focus-visible:ring-white focus-visible:ring-opacity-75">
                      <span className="font-bold">
                        It says that my timetable does not have a valid date
                        line. What should I do?
                      </span>
                      <ChevronUpIcon
                        className={`${open ? 'rotate-180' : ''
                          } h-5 w-5 text-teal-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="mt-1 rounded-lg px-4 py-2 text-sm text-white">
                      You could try inserting an “enter” right after the name of
                      your school. That should fix it, but you could also try
                      recopying and repasting the timetable.
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
            <div className="mx-auto w-full max-w-md rounded-2xl bg-transparent p-2">
              <Disclosure as="div" className="mt-2">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="my-4 flex w-full justify-between rounded-lg border-2 border-solid border-gray-800 bg-transparent px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring focus-visible:ring-white focus-visible:ring-opacity-75">
                      <span className="font-bold">How do I join a group?</span>
                      <ChevronUpIcon
                        className={`${open ? 'rotate-180' : ''
                          } h-5 w-5 text-teal-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="mt-1 rounded-lg px-4 py-2 text-sm text-white">
                      You can either accept invitations from other people or
                      create your own group. To create a group, go into your
                      profile and press ‘Groups’, and then press “Create Group”.
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>

              <Disclosure as="div" className="mt-2">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="my-4 flex w-full justify-between rounded-lg border-2 border-solid border-gray-800 bg-transparent px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring focus-visible:ring-white focus-visible:ring-opacity-75">
                      <span className="font-bold">
                        How can I join the team?
                      </span>
                      <ChevronUpIcon
                        className={`${open ? 'rotate-180' : ''
                          } h-5 w-5 text-teal-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="mt-1 rounded-lg px-4 py-2 text-sm text-white">
                      Email Oliver at o.chen@share.epsb.ca if you are
                      interested.
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>

              <Disclosure as="div" className="mt-2">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="my-4 flex w-full justify-between rounded-lg border-2 border-solid border-gray-800 bg-transparent px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring focus-visible:ring-white focus-visible:ring-opacity-75">
                      <span className="font-bold">How can I report bugs?</span>
                      <ChevronUpIcon
                        className={`${open ? 'rotate-180' : ''
                          } h-5 w-5 text-teal-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="mt-1 rounded-lg px-4 py-2 text-sm text-white">
                      Email Oliver at o.chen@share.epsb.ca if you have found a
                      bug.
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>

              <Disclosure as="div" className="mt-2">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="my-4 flex w-full justify-between rounded-lg border-2 border-solid border-gray-800 bg-transparent px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring focus-visible:ring-white focus-visible:ring-opacity-75">
                      <span className="font-bold">
                        How can I request features?
                      </span>
                      <ChevronUpIcon
                        className={`${open ? 'rotate-180' : ''
                          } h-5 w-5 text-teal-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="mt-1 rounded-lg px-4 py-2 text-sm text-white">
                      Email Oliver at o.chen@share.epsb.ca if you have any
                      suggestions.
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-screen-xl py-12 px-4 leading-6 text-black sm:px-6 md:py-16 lg:px-8">
        <div className="relative rounded-3xl bg-[#23202a] py-16 text-black lg:py-20">
          <svg
            className="absolute inset-y-0 right-1/4 z-20 block h-full w-1/4 align-middle text-[#23202a]"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
            fill="currentcolor"
          >
            <polygon points="0,0 100,0 0,100" className=""></polygon>
          </svg>
          <div className="absolute inset-y-0 left-1/2 z-10 h-full w-1/2 bg-[#1e1b24]"></div>
          <div className="relative z-30 mx-auto flex flex-col items-center justify-center px-4 text-center sm:px-16 lg:flex-row lg:text-left">
            <div className="max-w-lg text-2xl font-bold leading-8 sm:text-4xl sm:leading-10 lg:w-1/2">
              <h5 className="m-0 text-4xl font-extrabold leading-10 tracking-tight text-white sm:text-5xl sm:leading-none">
                Still need help?
              </h5>
            </div>
            <div className="mt-10 flex max-w-lg justify-center lg:mt-0 lg:w-1/2 lg:justify-end">
              <a
                className="flex h-12 w-auto cursor-pointer items-center justify-center rounded-full bg-white py-4 px-8 text-base font-semibold leading-snug text-gray-900 ease-in-out hover:bg-gray-900 hover:text-white"
                href="https://discord.gg/szjzhYkT9e"
                target="_blank"
                rel="noreferrer"
              >
                Join our Discord server
              </a>
            </div>
          </div>
        </div>
      </section>
    </Main>
  );
};

export default Support;
