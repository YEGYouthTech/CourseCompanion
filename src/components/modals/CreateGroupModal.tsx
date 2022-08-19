import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { HiOutlinePlusCircle as PlusCircleIcon } from 'react-icons/hi';

import { useAuth } from '@/contexts/AuthContext';

import BaseModal from '../BaseModal';

export default function CreateGroupModal({ modalState, reloadSettings }) {
  const { user } = useAuth();
  const [name, setName] = useState('');

  function submit() {
    toast.promise(
      (async () => {
        const request = await fetch(`/api/groups/create`, {
          method: 'POST',
          body: JSON.stringify({
            name,
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
        reloadSettings();
      })(),
      {
        loading: 'Creating group...',
        success: <b>Group created!</b>,
        error: (error: Error) => <b>Group creation failed: {error.message}</b>,
      }
    );
  }

  return (
    <BaseModal
      state={modalState}
      color="amber"
      icon={
        <PlusCircleIcon className="h-6 w-6 text-amber-600" aria-hidden="true" />
      }
      title={
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-gray-900"
        >
          Create Group
        </Dialog.Title>
      }
      btn1text="Create"
      btn1handler={submit}
    >
      <div className="flex flex-col">
        <div className="flex flex-col gap-1">
          <label className="text-gray-600">Group Name:</label>
          <input
            className="rounded-md border border-gray-500 px-4 py-2"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
    </BaseModal>
  );
}
