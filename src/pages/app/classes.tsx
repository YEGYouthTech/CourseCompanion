import { useContext, useState } from 'react';

import { DataContext } from '@/templates/AppMain';

import UserPicker from '../../components/UserPicker';

const AppClasses = () => {
  const selectedState1 = useState(null);
  const selectedState2 = useState(null);
  const dataContext = useContext(DataContext);
  const { group, data } =
    dataContext === null ? { group: null, data: null } : dataContext;
  const getIntersection = (userId1: any, userId2: any) => {
    if (!userId1 || !userId2) {
      return [];
    }
    const user1 = data.find((timetable: any) => timetable.uid === userId1);
    const user2 = data.find((timetable: any) => timetable.uid === userId2);
    if (!user1 || !user2) {
      return [];
    }
    const intersection = user1.blocks.filter((block: any, bid: number) =>
      user2.blocks.some(
        (block2: any, bid2: number) =>
          block2.code === block.code && bid === bid2
      )
    );
    return intersection;
  };

  return (
    <>
      <h1 className="mb-2 pt-4 text-center font-display text-2xl font-bold text-gray-750">
        Classes
      </h1>
      <div className="flex flex-col">
        <div className="flex">
          <UserPicker
            selectedState={selectedState1}
            onSelect={() => {}}
            showButton={false}
          />
          <UserPicker
            selectedState={selectedState2}
            onSelect={() => {}}
            showButton={false}
          />
        </div>
        <div className="flex text-red-700">
          <span className="w-56 text-right text-xs">
            {!data.find(
              (timetable: any) => timetable.uid === selectedState1[0]?.uid
            )?.blocks?.length && "User's timetable not found in group"}
          </span>
          <span className="w-56 text-right text-xs">
            {!data.find(
              (timetable: any) => timetable.uid === selectedState2[0]?.uid
            )?.blocks?.length && "User's timetable not found in group"}
          </span>
        </div>
      </div>
      <div className="flex">
        <ul>
          {getIntersection(selectedState1[0]?.uid, selectedState2[0]?.uid).map(
            (block: any) => (
              <li key={block.code}>
                {block.code} {block.name}
              </li>
            )
          )}
        </ul>
      </div>
    </>
  );
};

export default AppClasses;
