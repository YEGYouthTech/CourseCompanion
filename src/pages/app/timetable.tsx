import { useContext, useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

import { getBlockFromPeriod } from '@/lib/osa';
import { DataContext } from '@/templates/AppMain';

import UserPicker from '../../components/UserPicker';

const AppTimetable = () => {
  const selectedState1 = useState(null);
  const dataContext = useContext(DataContext);
  const { group, data } =
    dataContext === null ? { group: null, data: null } : dataContext;

  return (
    <>
      <div className="mx-auto my-8 flex max-w-xl flex-col">
        <UserPicker
          selectedState={selectedState1}
          onSelect={() => {}}
          showButton={false}
        />
        <span className="xs:hidden flex w-56 items-center text-left text-xs font-bold text-red-400">
          {!data.find(
            (timetable: any) => timetable.uid === selectedState1[0]?.uid
          )?.blocks?.length && "User's timetable not found in group"}
        </span>
      </div>
      <ScrollContainer>
        <div className="relative mx-auto max-w-7xl shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3"></th>
                <th scope="col" className="px-6 py-3">
                  Monday
                </th>
                <th scope="col" className="px-6 py-3">
                  Tuesday
                </th>
                <th scope="col" className="px-6 py-3">
                  Wednesday
                </th>
                <th scope="col" className="px-6 py-3">
                  Thursday
                </th>
                <th scope="col" className="px-6 py-3">
                  Friday
                </th>
              </tr>
            </thead>
            <tbody>
              {/* inline nested for loop - 4 periods and 5 days */}
              {Array.from({ length: 4 }, (_, i) => i + 1).map((period) => (
                <tr
                  className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                  key={period}
                >
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    Period {period}
                  </th>
                  {/* inline nested for loop - 4 periods and 5 days */}
                  {Array.from({ length: 5 }, (_, i) => i + 1).map((day) => (
                    <td className="px-6 py-4" key={`${day}_${period}`}>
                      {data &&
                        selectedState1[0]?.uid &&
                        data?.find(
                          (timetable: any) =>
                            timetable.uid === selectedState1[0]?.uid
                        )?.blocks?.[getBlockFromPeriod(day, period) - 1]?.code}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollContainer>
    </>
  );
};

export default AppTimetable;
