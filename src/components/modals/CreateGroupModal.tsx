import { Dialog } from '@headlessui/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { HiOutlinePlusCircle as PlusCircleIcon } from 'react-icons/hi';

import { useAuth } from '@/contexts/AuthContext';

import BaseModal from '../BaseModal';

export default function CreateGroupModal({
  modalState,
  reloadSettings,
  changingGroup,
}) {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState('');

  function submit() {
    toast.promise(
      (async () => {
        const request = await fetch(
          `/api/groups/${!changingGroup ? 'create' : 'group'}`,
          {
            method: !changingGroup ? 'POST' : 'PUT',
            body: JSON.stringify({
              id: changingGroup || undefined,
              name,
              profileImage,
            }),
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
        reloadSettings();
      })(),
      {
        loading: `${!changingGroup ? 'Creating' : 'Editing'} group...`,
        success: <b>Group {!changingGroup ? 'created' : 'updated'}!</b>,
        error: (error: Error) => (
          <b>
            Group ${!changingGroup ? 'creation' : 'modification'} failed:{' '}
            {error.message}
          </b>
        ),
      }
    );
  }

  useEffect(() => {
    if (!changingGroup) {
      return;
    }
    setName(changingGroup.name);
    setProfileImage(changingGroup.profileImage);
  }, [changingGroup]);

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
          {!changingGroup ? 'Create' : 'Edit'} Group
        </Dialog.Title>
      }
      btn1text={!changingGroup ? 'Create' : 'Save'}
      btn1handler={submit}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-gray-600">Group Name:</label>
          <input
            className="rounded-md border border-gray-500 px-4 py-2"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-gray-600">Group Profile URL:</label>
          <input
            className="rounded-md border border-gray-500 px-4 py-2 text-xs"
            type="text"
            placeholder="https://media.discordapp.net/attachments/.../.../unknown.png"
            value={profileImage}
            onChange={(e) => setProfileImage(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-gray-600">Group preview:</label>
          <div className="mx-auto my-1 flex w-full max-w-lg flex-col items-center justify-between rounded-md border-b p-4 sm:flex-row">
            <div className="flex w-full flex-row items-center space-x-4">
              <img
                src={
                  profileImage ||
                  'https://lh3.googleusercontent.com/a/default-user'
                }
                alt="Group profile"
                className="h-12 w-12 rounded-full"
                referrerPolicy="no-referrer"
              />
              <div className="grow">
                <h1 className="tracking-tight">{name}</h1>
                <p className="text-sm font-light text-gray-500">
                  {user.displayName}
                </p>
              </div>
              <div>
                <button className="rounded-full p-2 font-bold text-black/70 hover:text-black/100">
                  <PlusCircleIcon className="h-6 w-6 text-black/70" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
