import { Dialog } from '@headlessui/react';
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { HiUserGroup as UserGroupIcon } from 'react-icons/hi';

import { useAuth } from '@/contexts/AuthContext';

import useUpdateEffect from '../../hooks/useUpdateEffect';
import BaseModal from '../BaseModal';
import GroupList from '../GroupList';
import CreateGroupModal from './CreateGroupModal';
import ManageGroupModal from './ManageGroupModal';

type ISetTimetableModalProps = {
  state: [boolean, Dispatch<SetStateAction<boolean>>];
};

export default function SettingsModal({
  state: modalState,
}: ISetTimetableModalProps) {
  const { user } = useAuth();
  const [groups, setGroups] = useState([]);
  const inviteModalState = useState(false);
  const inviteModalGroup = useState(null);
  const createGroupModalState = useState(false);
  const groupSettingsModalState = useState(false);
  const groupSettingsModalGroup = useState(null);
  console.log(user);
  function reloadSettings(): void {
    async function updateDbUser() {
      if (!user) {
        throw new Error('Not logged in');
      }
      const request = await fetch(`/api/users/${user.uid}?listGroups=1`, {
        headers: {
          'Content-Type': 'application/json',
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
      if (json.groups) {
        console.log(json.groups);
        json.groups.sort((a, b) => a.name.localeCompare(b.name));
        const { groups } = json;
        json.pendingInvites.forEach((group) => {
          group.isPending = true;
          groups.push(group);
        });
        setGroups(groups);
      }
    }
    toast.promise(
      updateDbUser(),
      {
        loading: 'Loading groups...',
        success: <b>Groups loaded!</b>,
        error: (error: Error) => <b>Groups failed to load: {error.message}</b>,
      },
      {
        id: 'groups-load',
        duration: 5000,
      }
    );
  }
  useUpdateEffect(reloadSettings, [user]);
  useUpdateEffect(() => {
    addEventListener('focus', reloadSettings);
    return () => {
      removeEventListener('focus', reloadSettings);
    };
  }, []);
  return (
    <>
      <BaseModal
        state={modalState}
        color="amber"
        icon={
          <UserGroupIcon
            className="h-6 w-6 text-amber-600"
            aria-hidden="true"
          />
        }
        title={
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-gray-900"
          >
            Groups
          </Dialog.Title>
        }
        btn1text="Close"
        btn1handler={() => modalState[1](false)}
      >
        <GroupList
          groups={groups}
          group={inviteModalGroup}
          inviteModalState={inviteModalState}
          reloadSettings={reloadSettings}
        />
        {/* full width button that says create group */}
        <button
          className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-amber-600 py-2 px-4 text-base font-medium leading-6 text-white transition duration-150 ease-in-out hover:bg-amber-500 focus:border-amber-700 focus:outline-none focus:outline-amber-800 active:bg-amber-700"
          onClick={() => createGroupModalState[1](true)}
        >
          Create Group
        </button>
      </BaseModal>
      <ManageGroupModal
        group={inviteModalGroup}
        modalState={inviteModalState}
        groupSettingsModalState={groupSettingsModalState}
        groupSettingsModalGroup={groupSettingsModalGroup}
        reloadSettings={reloadSettings}
      />
      <CreateGroupModal
        modalState={createGroupModalState}
        reloadSettings={reloadSettings}
      />
      <CreateGroupModal
        modalState={groupSettingsModalState}
        reloadSettings={reloadSettings}
        changingGroup={groupSettingsModalGroup[0] || true}
      />
    </>
  );
}
