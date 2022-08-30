import { useContext } from "react";

import { DataContext } from "@/templates/AppMain";

import { Block, Blocks } from "../../components/vis/Blocks";

const AppTable = () => {
  const dataContext = useContext(DataContext);
  const { group, data } =
    dataContext === null ? { group: null, data: null } : dataContext;
  return (
    <>
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
    </>
  );
};

export default AppTable;
