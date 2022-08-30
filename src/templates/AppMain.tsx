import { useRouter } from 'next/router';
import { createContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'react-hot-toast';
import { HiCog as CogIcon } from 'react-icons/hi';

import { useAuth } from '@/contexts/AuthContext';
import { Main } from '@/templates/Main';

import AppNav from '../components/AppNav';
import GroupPicker from '../components/GroupPicker';
import useUpdateEffect from '../hooks/useUpdateEffect';

type IAppMainProps = {
  meta: React.ReactNode;
  children: React.ReactNode;
};

export const DataContext = createContext(null);

const AppMain = (props: IAppMainProps) => {
  const [groups, setGroups] = useState<any>([]);
  const [group, setGroup] = useState<any>(null);
  const [data, setData] = useState<any>([]);
  const [userReady, setUserReady] = useState(true);

  const { user } = useAuth();

  const router = useRouter();

  useUpdateEffect(() => {
    async function fetchGroups() {
      if (!user) {
        throw new Error('Not logged in');
      }

      const request = await fetch(`/api/users/${user.uid}/?listGroups=1`, {
        headers: {
          Authorization: `${await user.getIdToken()}`,
        },
      });
      // if (request.status !== 200) {
      //   throw new Error(
      //     `Received error HTTP status code ${request.status} ${request.statusText}`
      //   );
      // }
      const json = await request.json();
      if (!request.ok || json?.error !== undefined) {
        throw new Error(json?.error || 'Unknown error');
      }
      setGroups(json.groups);
    }
    fetchGroups().catch((err) => {
      setUserReady(false);
      if (router.pathname !== '/app') {
        toast.error(err.message);
        router.push('/profile');
      }
    });
  }, [user]);

  useUpdateEffect(() => {
    async function fetchData() {
      const groupObj: any = groups.find((g) => g.name === group);
      const members: any = groupObj?.members || [];
      const timetables: any = [];
      await Promise.all(
        members.map((member) =>
          (async (member) => {
            const request = await fetch(
              `/api/users/${member}/?mutualGroup=${groupObj._id}`,
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `${await user.getIdToken()}`,
                },
              }
            );
            // if (request.status !== 200) {
            //   throw new Error(
            //     `Received error HTTP status code ${request.status} ${request.statusText}`
            //   );
            // }
            const json = await request.json();
            if (!request.ok || json?.error !== undefined) {
              throw new Error(json?.error || 'Unknown error');
            }
            try {
              let timetable = JSON.parse(json?.timetable);
              if (!timetable) {
                throw new Error('Invalid timetable');
              }
              timetable = {
                ...timetable,
                uid: member,
                name: json?.name,
                profileImage: json?.profileImage,
              };
              timetables.push(timetable);
            } catch (e) {
              console.log(e);
            }
          })(member)
        )
      );
      setData(timetables.filter((t) => t?.blocks?.length > 0));
    }
    toast.promise(
      fetchData(),
      {
        loading: 'Loading data...',
        success: <b>Data loaded!</b>,
        error: (error: Error) => <b>Data failed to load: {error.message}</b>,
      },
      {
        id: 'data-load',
      }
    );
  }, [group]);

  return (
    <Main meta={props.meta}>
      {router.pathname === '/app' ? (
        <>
          {userReady ? <AppNav /> : <div className="mt-32"></div>}
          {props.children}
        </>
      ) : (
        <>
          <AppNav />
          <div className="flex">
            <div className="grow"></div>
            <GroupPicker
              state={[group, setGroup]}
              groupsState={[groups, setGroups]}
            />
            <button className="mx-2 flex items-center p-2 text-gray-500">
              <CogIcon className="h-5 w-5" />
            </button>
          </div>
          <DataContext.Provider value={{ group, data }}>
            {group ? (
              props.children
            ) : (
              <>
                <Helmet>
                  <style>
                    {`
                    body {
                      background-color: #18181b;
                    }
                    .neon {
                      color: #fff;
                      text-shadow:
                        0 0 5px #fff,
                        0 0 10px #fff,
                        0 0 20px #fff,
                        0 0 40px #0ff,
                        0 0 80px #0ff,
                        0 0 90px #0ff,
                        0 0 100px #0ff,
                        0 0 150px #0ff;
                    }

                    html, body {
                      height: 100%;
                      margin: 0;
                    }

                    body {
                      background-color: #18181b;
                    }

                    h1 {
                      font-weight: 400;
                      text-align: center;
                      text-transform: uppercase;
                      font-family: -apple-system,
                        BlinkMacSystemFont,
                        "Segoe UI",
                        Roboto,
                        Oxygen-Sans,
                        Ubuntu,
                        Cantarell,
                        "Helvetica Neue",
                        sans-serif;
                    }
                    `}
                  </style>
                </Helmet>
                <div className="-mt-10">
                  <img
                      className='sm:rotate-90'
                      style={{
                        width: '250px',
                        position: 'absolute',
                        top: '12%',
                        right: '20%',
                        transform: 'rotate(-17deg)'
                      }}
                      src="/arrow.png"
                      alt="arrow"
                    />
                    <h1
                      className='animate-gradient-slow bg-gradient-to-r sm:text-3xl font-bold from-primary-500 via-blue-500 to-primary-500 bg-clip-text !text-transparent'
                      style={{
                        color: 'white',
                        position: 'absolute',
                        top: '38%',
                        right: '28%',
                        textTransform: 'capitalize',
                        textAlign: 'right',
                      }}
                    >
                      Get started!
                    </h1>
                </div>
              </>
            )}
          </DataContext.Provider>
        </>
      )}
    </Main>
  );
};

export default AppMain;
