import { useContext } from 'react';

import { DataContext } from '@/templates/AppMain';

const AppMutuals = () => {
  const dataContext = useContext(DataContext);
  const { group, data } =
    dataContext === null ? { group: null, data: null } : dataContext;
  const listOfClasses = [
    ...new Set(
      [].concat.apply(
        [],
        data.map((timetable: any) =>
          timetable.blocks.map(
            (block: any, id: number) => `${block.code}_${id + 1}`
          )
        )
      )
    ),
  ].sort();
  const mutuals = listOfClasses.map((code: string) => {
    const [courseCode, blockNumber] = code.split('_');
    const mutuals = data
      .map((timetable: any) => {
        const block = timetable.blocks.find(
          (block: any) => block.code === courseCode
        );
        if (block) {
          return {
            name: timetable.name,
            profileImage: timetable.profileImage,
          };
        }
        return null;
      })
      .filter((i: any) => i !== null);
    return {
      courseCode,
      blockNumber,
      mutuals,
    };
  });

  return data && data.length !== 0 ? (
    <div className="m-4">
      <pre>
        <code>{JSON.stringify(mutuals, null, 2)}</code>
      </pre>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </div>
  ) : (
    <>
      <h1 className="mb-2 pt-4 text-center font-display text-2xl font-bold text-gray-750">
        Please choose a group
      </h1>
    </>
  );
};

export default AppMutuals;
