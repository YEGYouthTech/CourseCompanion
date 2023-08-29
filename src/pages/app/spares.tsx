import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import ScrollContainer from 'react-indiana-drag-scroll';
import { Tooltip } from 'react-tippy';

import { getBlockFromPeriod } from '@/lib/osa';
import { DataContext } from '@/templates/AppMain';

function getPeopleWithSpares(data: any, day: number, period: number) {
  if (!data) {
    return [];
  }
  const block = getBlockFromPeriod(day, period);
  return data.filter((person) => person.blocks[block - 1]?.code === 'SPARE');
}

const AppSpares = () => {
  const dataContext = useContext(DataContext);
  const { group, data } =
    dataContext === null ? { group: null, data: null } : dataContext;
  return (
    <>
      <Helmet>
        <style>
          {`
          body {
            overflow: hidden;
          }
          `}
        </style>
      </Helmet>
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
                      {getPeopleWithSpares(data, day, period).map((person) => (
                        <span className="-ml-4" key={person.name}>
                          <Tooltip title={person.name}>
                            <img
                              className="mt-8 inline-block h-8 w-8 max-w-full rounded-full border-2 border-gray-200 bg-gray-300 shadow-xl hover:-translate-y-1 dark:border-gray-700 dark:bg-gray-900 md:h-12 md:w-12"
                              src={person.profileImage}
                              alt={person.name}
                              title={person.name}
                              referrerPolicy="no-referrer"
                            />
                          </Tooltip>
                        </span>
                      ))}
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

export default AppSpares;
