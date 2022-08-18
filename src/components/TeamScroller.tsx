type ITeamScrollerProps = {
  members: Member[];
  maxHeight?: number;
};

type Member = {
  name: string;
  title?: string;
  image: string;
};

export default function TeamScroller({
  members,
  maxHeight,
}: ITeamScrollerProps) {
  return (
    <div
      className="w-80 text-white"
      style={{
        maxHeight: maxHeight ? `${maxHeight}px` : 'none',
        overflow: 'auto',
      }}
    >
      {members.map((member) => (
        <div
          key={member.name}
          className={`relative flex w-full items-center rounded-lg border-gray-600 py-2 px-4 ${
            !member.image ? 'justify-center' : ''
          }`}
        >
          {member.image && (
            <img
              className="mr-4 h-16 w-16 rounded-full"
              src={member.image}
              alt={member.name}
            />
          )}
          <div className="flex flex-col">
            <span className="block text-xl font-medium text-white/95">
              {member.name}
            </span>
            {member.title && (
              <span className="block text-base font-normal text-white/75">
                {member.title}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
