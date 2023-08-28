import Editor from '@monaco-editor/react';
import { useContext, useEffect, useState } from 'react';
import { HiDatabase, HiGlobe, HiUserGroup, HiUsers } from 'react-icons/hi';

import GroupList from '@/components/GroupList';
import GroupMember from '@/components/GroupMember';
import { useAuth } from '@/contexts/AuthContext';
import { DataContext } from '@/templates/AppMain';

function Stats({ adminData }: { adminData: { groups: any[]; users: any[] } }) {
  return (
    <>
      <div className="py-5">
        <main className="h-full overflow-y-auto">
          <div className="container mx-auto grid max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Cards */}
            <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {/* Card */}
              <div className="shadow-xs flex items-center rounded-lg bg-white p-4 dark:bg-gray-800">
                <div className="mr-4 rounded-full bg-orange-100 p-3 text-orange-500 dark:bg-orange-500 dark:text-orange-100">
                  <HiUserGroup />
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Groups
                  </p>
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                    {adminData.groups.length}
                  </p>
                </div>
              </div>
              {/* Card */}
              <div className="shadow-xs flex items-center rounded-lg bg-white p-4 dark:bg-gray-800">
                <div className="mr-4 rounded-full bg-green-100 p-3 text-green-500 dark:bg-green-500 dark:text-green-100">
                  <HiUsers />
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Users
                  </p>
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                    {adminData.users.length}
                  </p>
                </div>
              </div>
              {/* Card */}
              <div className="shadow-xs flex items-center rounded-lg bg-white p-4 dark:bg-gray-800">
                <div className="mr-4 rounded-full bg-teal-100 p-3 text-teal-500 dark:bg-teal-500 dark:text-teal-100">
                  <HiGlobe />
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Members
                  </p>
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                    {adminData.groups.reduce(
                      (acc, curr) => acc + curr.members.length,
                      0
                    )}
                  </p>
                </div>
              </div>
              {/* Card */}
              <div className="shadow-xs flex items-center rounded-lg bg-white p-4 dark:bg-gray-800">
                <div className="mr-4 rounded-full bg-blue-100 p-3 text-blue-500 dark:bg-blue-500 dark:text-blue-100">
                  <HiDatabase />
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Timetables
                  </p>
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                    {adminData.users.reduce(
                      (acc, curr) => acc + (curr.timetable ? 1 : 0),
                      0
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

function UserList({ users }: { users: any[] }) {
  return (
    <div className="py-5">
      <main className="h-full overflow-y-auto">
        <div className="container mx-auto grid max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {users.map((user) => (
              <GroupMember
                key={user.uid}
                memberId={user.uid}
                groupId={null}
                reloadSettings={() => {}}
                modalState={[false, () => {}]}
                memberData={user}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function AdminPage() {
  const dataContext = useContext(DataContext);
  const { group, data } =
    dataContext === null ? { group: null, data: null } : dataContext;
  const { user } = useAuth();
  const [adminData, setAdminData] = useState(null);

  // load admin data
  useEffect(() => {
    async function loadAdminData() {
      const adminDataRequest = await fetch(`/api/admin`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${await user.getIdToken()}`,
        },
      });
      const adminDataResponse = await adminDataRequest.json();
      setAdminData(adminDataResponse);
    }
    if (user) {
      loadAdminData();
    }
  }, [user]);

  return (
    <div className="flex h-full w-full flex-col">
      <h1 className="bg-gradient-to-tr from-blue-400 to-teal-400 bg-clip-text text-center text-4xl font-extrabold text-transparent">
        Administration Panel
      </h1>
      {adminData && <Stats adminData={adminData} />}
      <div className="mx-auto flex w-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
        <Editor
          height="600px"
          defaultLanguage="json"
          value={JSON.stringify(adminData, null, '\t')}
          theme="vs-dark"
        />
      </div>
      {/* User List */}
      <div className="mx-auto my-8 flex w-full max-w-7xl flex-col rounded-lg bg-gray-100 p-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold">Users</h2>
        {adminData && <UserList users={adminData.users} />}
      </div>
      {/* Group List */}
      <div className="mx-auto my-8 flex w-full max-w-7xl flex-col rounded-lg bg-gray-100 p-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold">Groups</h2>
        <GroupList
          groups={adminData ? adminData.groups : []}
          group={[group, () => {}]}
          reloadSettings={() => {}}
          inviteModalState={[false, () => {}]}
        />
      </div>
    </div>
  );
}
