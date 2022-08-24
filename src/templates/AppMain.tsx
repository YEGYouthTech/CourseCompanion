import { createContext, useState } from 'react';
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
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState(null);
  const [data, setData] = useState([]);

  const { user } = useAuth();

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
      if (request.status !== 200) {
        throw new Error(
          `Received error HTTP status code ${request.status} ${request.statusText}`
        );
      }
      const json = await request.json();
      if (!request.ok || json?.error !== undefined) {
        throw new Error(json?.error || 'Unknown error');
      }
      setGroups(json.groups);
    }
    fetchGroups();
  }, [user]);

  useUpdateEffect(() => {
    async function fetchData() {
      const groupObj = groups.find((g) => g.name === group);
      const members = groupObj?.members || [];
      const timetables = [];
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
            if (request.status !== 200) {
              throw new Error(
                `Received error HTTP status code ${request.status} ${request.statusText}`
              );
            }
            const json = await request.json();
            if (!request.ok || json?.error !== undefined) {
              throw new Error(json?.error || 'Unknown error');
            }
            try {
              timetables.push(JSON.parse(json?.timetable));
            } catch (e) {
              console.log(e);
            }
          })(member)
        )
      );
      setData(timetables);
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
      <AppNav></AppNav>
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
        {props.children}
      </DataContext.Provider>
    </Main>
  );
};

export default AppMain;
