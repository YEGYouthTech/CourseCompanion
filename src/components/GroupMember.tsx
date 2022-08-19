import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { HiOutlineUserRemove as UserRemoveIcon } from 'react-icons/hi';

import { useAuth } from '@/contexts/AuthContext';

export default function GroupMember({
  memberId,
  groupId,
  reloadSettings,
  modalState,
}) {
  const [member, setMember] = useState(null);
  const { user } = useAuth();
  async function loadMember() {
    const request = await fetch(`/api/users/${memberId}`, {
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
    setMember(json);
  }
  useEffect(() => {
    loadMember();
  }, []);

  // return <li>{member ? member.name : memberId}</li>;
  return (
    <div className="mt-2 flex w-full items-center gap-4 rounded-lg border-gray-600 py-2 px-4">
      {member?.profileImage && (
        <img
          className="h-8 w-8 rounded-full"
          src={member.profileImage}
          alt={member.name}
        />
      )}
      <div className="flex grow flex-col">
        <span className="block text-base text-black/95">
          {(member?.name && member.name) || memberId}
        </span>
        {member?.uid && (
          <span className="block text-xs font-normal text-black/75">
            {member.uid}
          </span>
        )}
      </div>
      <div className="flex">
        <button
          className="text-xs font-normal text-black/75"
          onClick={() => {
            toast.promise(
              (async () => {
                const request = await fetch(`/api/groups/group`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${await user.getIdToken()}`,
                  },
                  body: JSON.stringify({
                    group: groupId,
                    user: memberId,
                    action: 'remove',
                  }),
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
                loadMember();
                reloadSettings();
                if (memberId === user.uid) {
                  modalState[1](false);
                }
              })(),
              {
                loading: 'Removing member...',
                success: <b>Member removed!</b>,
                error: (error: Error) => (
                  <b>Failed to remove member: {error.message}</b>
                ),
              }
            );
          }}
        >
          <UserRemoveIcon
            className="h-6 w-6 p-1 text-red-600"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
}
