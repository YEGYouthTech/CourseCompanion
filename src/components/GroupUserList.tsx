import GroupMember from './GroupMember';

export default function GroupUserList({ group, reloadSettings, modalState }) {
  return (
    <div
      className="mt-4 w-full text-white"
      style={{
        maxHeight: '20rem',
        overflow: 'auto',
      }}
    >
      {group.members.map((memberId) => (
        <GroupMember
          key={memberId}
          memberId={memberId}
          groupId={group._id}
          reloadSettings={reloadSettings}
          modalState={modalState}
        />
        // <li key={memberId}>{memberId}</li>
      ))}
    </div>
  );
}
