import { toast } from 'react-hot-toast';

import { useAuth } from '@/contexts/AuthContext';

import GroupListItem from './GroupListItem';

export default function GroupList({
  groups,
  group: groupState,
  inviteModalState,
  reloadSettings,
}) {
  const { user } = useAuth();
  return (
    <div className="mt-4">
      <div className="list-container">
        {!groups.length && (
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="text-xl font-bold">No groups</div>
              <div className="text-base">
                Create a group to compare timetables with friends
              </div>
            </div>
          </div>
        )}
        {groups.map((group) => (
          <GroupListItem
            key={`${group._id}-${user.uid}-${group.isPending}-${
              group.owner === user.uid
            }`}
            group={group}
            isPending={group?.isPending || false}
            inviteButtonHandler={() => {
              inviteModalState[1](true);
              groupState[1](group);
            }}
            acceptButtonHandler={() => {
              toast.promise(
                (async () => {
                  const request = await fetch(`/api/groups/group`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `${await user.getIdToken()}`,
                    },
                    body: JSON.stringify({
                      group: group._id,
                      user: user.uid,
                      action: 'add',
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
                  inviteModalState[1](false);
                  groupState[1](null);
                  reloadSettings();
                })(),
                {
                  loading: 'Joining group...',
                  success: <b>Joined group!</b>,
                  error: (error: Error) => <b>Join failed: {error.message}</b>,
                }
              );
            }}
            declineButtonHandler={() => {
              toast.promise(
                (async () => {
                  const request = await fetch(`/api/groups/group`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `${await user.getIdToken()}`,
                    },
                    body: JSON.stringify({
                      group: group._id,
                      user: user.uid,
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
                  reloadSettings();
                })(),
                {
                  loading: 'Rejecting group...',
                  success: <b>Group rejected!</b>,
                  error: (error: Error) => (
                    <b>Reject failed: {error.message}</b>
                  ),
                }
              );
            }}
          />
        ))}
      </div>
    </div>
  );
}
