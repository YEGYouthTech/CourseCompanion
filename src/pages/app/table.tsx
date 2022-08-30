import { useContext } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

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
      <div className="m-4">
        <ScrollContainer className="-mt-20 px-4 pt-20">
          <div className="w-[928px] rounded-lg bg-white text-sm">
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
                        hideHeader={index !== 0}
                        nameHeader={timetable.name}
                      />
                    </>
                  )}
                </>
              );
            })}
          </div>
        </ScrollContainer>
      </div>
    </>
  );
};

export default AppTable;
