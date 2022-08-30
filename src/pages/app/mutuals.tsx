import { useContext } from 'react';
import { Tooltip } from 'react-tippy';
import styled, { css } from 'styled-components';

import { DataContext } from '@/templates/AppMain';

const Header = styled.h1<{ secondary?: boolean }>`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
  ${(props) =>
    props.secondary &&
    css`
      margin-top: -0.5rem;
      font-size: 1.1rem;
      font-weight: normal;
    `}
  padding-left: 0rem;
  @media (max-width: 850px) {
    padding-left: 1.25rem;
  }
`;

const TableWrapper = styled.div`
  padding-right: 3rem;
  padding-left: 3rem;
  font-family: Gilroy, sans-serif;
  padding-bottom: 1rem;
  padding-top: 0rem;
  @media (max-width: 600px) {
    padding-right: 0rem;
    padding-left: 0rem;
    width: 100%;
    overflow-x: auto;
    padding-top: 1rem;
    padding-bottom: 0;
  }
  width: min(100vw, 50rem);
  margin-left: auto;
  margin-right: auto;
  margin-top: 2rem;
`;

const Table = styled.table`
  position: relative;
  width: 100%;
  border-collapse: collapse;
  border-style: hidden;
  border-radius: 5px;
  box-shadow: 0 0 0 1px #666;
  margin-top: 1rem;
  @media (max-width: 850px) {
    border-radius: 0px;
  }
`;

const Tbody = styled.tbody``;

const Thead = styled.thead``;

const Tr = styled.tr``;

const Th = styled.th<{ left?: boolean; mono?: boolean }>`
  background-color: #4263eb;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  border-left: 1px solid #364fc7;
  border-right: 1px solid #364fc7;
  color: white;
  ${(props) =>
    props.left &&
    css`
      text-align: left;
      padding-left: 2.5rem;
      padding-right: 2.5rem;
    `}
  ${(props) =>
    props.mono &&
    css`
      font-family: Space Mono, monospace;
    `}
`;

const Td = styled.td<{
  mono?: boolean;
  color?: string;
  icon?: boolean;
}>`
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  border-left: 1px solid gray;
  border-right: 1px solid gray;
  vertical-align: middle;
  text-align: center;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  min-width: 4rem;
  background-color: ${(props) => props.color && props.color};
  ${(props) =>
    props.mono &&
    css`
      font-family: Space Mono, monospace;
    `}
  ${(props) =>
    props.icon &&
    css`
      width: 18rem;
    `}
`;

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
          (block: any, blockNum: number) =>
            block.code === courseCode && blockNum + 1 === parseInt(blockNumber)
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

  console.log(mutuals);

  return (
    <>
      <TableWrapper>
        <Table>
          <Thead>
            <Tr>
              <Th>Block #</Th>
              <Th>Course</Th>
              <Th>Mutuals</Th>
            </Tr>
          </Thead>
          <Tbody>
            {mutuals.map((i) => (
              <Tr>
                <Td mono>{i.blockNumber}</Td>
                <Td mono>{i.courseCode}</Td>
                <Td mono icon>
                  <div className="-gap-2 my-4 flex flex-row justify-center">
                    {i.mutuals.map((j) => (
                      <span className="-ml-4" key={j.name}>
                        <Tooltip title={j.name}>
                          <img
                            className="inline-block h-12 w-12 max-w-full rounded-full border-2 border-gray-200 bg-gray-300 shadow-xl hover:-translate-y-1 dark:border-gray-700 dark:bg-gray-900"
                            src={j.profileImage}
                            alt={j.name}
                            title={j.name}
                            referrerPolicy="no-referrer"
                          />
                        </Tooltip>
                      </span>
                    ))}
                  </div>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableWrapper>
    </>
  );
};

export default AppMutuals;
