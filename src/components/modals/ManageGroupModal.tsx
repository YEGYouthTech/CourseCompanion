import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  HiOutlineTrash as TrashIcon,
  HiUserGroup as UserGroupIcon,
} from 'react-icons/hi';

import { useAuth } from '@/contexts/AuthContext';

import BaseModal from '../BaseModal';
import GroupUserList from '../GroupUserList';
import UserPicker from '../UserPicker';

export default function ManageGroupModal({
  group,
  modalState,
  reloadSettings,
}) {
  if (!group[0]) {
    return null;
  }

  const selectedState = useState(null);
  const { user } = useAuth();

  function submitInvite() {
    if (!selectedState[0]) {
      return;
    }
    const selected = selectedState[0];
    console.log(selected, group[0]._id);
    toast.promise(
      (async () => {
        const request = await fetch(`/api/groups/invite`, {
          method: 'POST',
          body: JSON.stringify({
            group: group[0]._id,
            userId: selected.uid,
            isInvited: true,
          }),
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
      })(),
      {
        loading: 'Inviting user...',
        success: <b>User invited!</b>,
        error: (error: Error) => <b>Invite failed: {error.message}</b>,
      }
    );
  }

  return (
    <BaseModal
      state={modalState}
      color="amber"
      icon={
        <UserGroupIcon className="h-6 w-6 text-amber-600" aria-hidden="true" />
      }
      title={
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-gray-900"
        >
          {group[0].name}
        </Dialog.Title>
      }
      btn1text="Close"
      btn1handler={() => modalState[1](false)}
    >
      <p className="text-black/85 mb-4 text-sm">
        <span>Code: </span>
        <code className="font-monospace ml-1 text-xs">({group[0]._id})</code>
      </p>
      <UserPicker selectedState={selectedState} onSelect={submitInvite} />
      <GroupUserList group={group[0]} reloadSettings={reloadSettings} />
      <div className="flex flex-col gap-1">
        <button
          className="absolute top-0 right-0 mr-4 mt-4"
          onClick={() => {
            if (
              !window.confirm('Are you sure you want to delete this group?')
            ) {
              return;
            }
            toast.promise(
              (async () => {
                const request = await fetch(`/api/groups/delete`, {
                  method: 'POST',
                  body: JSON.stringify({
                    group: group[0]._id,
                  }),
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
                modalState[1](false);
              })(),
              {
                loading: 'Deleting group...',
                success: <b>Group deleted!</b>,
                error: (error: Error) => <b>Delete failed: {error.message}</b>,
              }
            );
          }}
        >
          <TrashIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
        </button>
      </div>
    </BaseModal>
  );
}
