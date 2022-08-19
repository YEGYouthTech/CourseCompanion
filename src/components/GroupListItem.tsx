import {
  HiCheck as CheckIcon,
  HiUserAdd as UserAddIcon,
  HiX as XIcon,
} from 'react-icons/hi';

import { useAuth } from '@/contexts/AuthContext';

export default function GroupListItem({
  group,
  isPending,
  inviteButtonHandler,
  acceptButtonHandler,
  declineButtonHandler,
}) {
  const { user } = useAuth();
  return (
    <div className="mx-auto my-1 flex max-w-lg flex-col items-center justify-between rounded-md border-b p-4 sm:flex-row">
      <div className="flex w-full flex-row items-center space-x-4">
        <img
          src={
            group.profileImage ||
            'https://lh3.googleusercontent.com/a/default-user'
          }
          alt="default img"
          className="h-12 w-12 rounded-full"
          referrerPolicy="no-referrer"
        />
        <div className="grow">
          <h1 className="tracking-tight">{group.name}</h1>
          <p className="text-sm font-light text-gray-500">
            {isPending
              ? 'Invite pending'
              : group.owner === user.uid
              ? 'Owner'
              : 'Member'}
          </p>
        </div>
        <div>
          {!isPending ? (
            <button
              className="rounded-full p-2 font-bold text-black/70 hover:text-black/100"
              onClick={inviteButtonHandler}
            >
              <UserAddIcon />
            </button>
          ) : (
            <>
              <button
                className="rounded-full p-2 font-bold text-green-800/70 hover:bg-black/20 hover:text-green-600/100"
                onClick={acceptButtonHandler}
                title="Accept Invite"
              >
                <CheckIcon />
              </button>
              <button
                className="rounded-full p-2 font-bold text-red-800/70 hover:bg-black/20 hover:text-red-600/100"
                onClick={declineButtonHandler}
                title="Decline Invite"
              >
                <XIcon />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
