import { useContext } from 'react';

import { DataContext } from '@/templates/AppMain';

import { Block, Blocks } from '../../components/vis/Blocks';

const AppTable = () => {
  const dataContext = useContext(DataContext);
  const { group, data } =
    dataContext === null ? { group: null, data: null } : dataContext;
  return (
    <>
      {/* <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre> */}
      {data && data.length !== 0 ? (
        <div className="m-4">
          <div className="-mt-20 overflow-x-auto px-4 pt-20">
            <div className="w-[928px] text-sm">
              {Array(10).map((_, i) => (
                <Block key={`blocksHeader${i}`} header={true} index={i} />
              ))}
              {data.map((timetable: any, index: number) => {
                return (
                  <>
                    {timetable.blocks && timetable.blocks.length !== 0 && (
                      <>
                        <Blocks
                          blocks={timetable.blocks}
                          hideHeader={true}
                          nameHeader={timetable.name}
                        />
                      </>
                    )}
                  </>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <>
          <h1 className="mb-2 pt-4 text-center font-display text-2xl font-bold text-gray-750">
            Please choose a group
          </h1>
          <p className="mb-8 text-center font-body">
            This is where the group will access every class its members take and
            the members that are in each class.
          </p>
        </>
      )}
    </>
  );
};

export default AppTable;
