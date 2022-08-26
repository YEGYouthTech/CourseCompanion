import { useContext } from 'react';
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
  width: min(100vw, 36rem);
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
  blue?: boolean;
  color?: string;
}>`
  border-top: 1px solid white;
  border-bottom: 1px solid white;
  vertical-align: middle;
  text-align: center;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-left: 1px solid white;
  border-right: 1px solid white;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  min-width: 4rem;
  background-color: ${(props) => props.color && props.color};
  color: white;
  ${(props) =>
    props.mono &&
    css`
      font-family: Space Mono, monospace;
    `}

  ${(props) =>
    props.blue &&
    css`
      border-top: 1px solid #364fc7;
      border-bottom: 1px solid #364fc7;
      background-color: #4263eb;
      color: white;
      font-weight: bold;
    `}
`;

const compareClasses = (p1: any, p2: any, onlyColor = false) => {
  // colors for 0% - 100%
  const hexList = [
    '#E33737',
    '#DA5639',
    '#FF5C28',
    '#D7B04B',
    '#C5C058',
    '#B1D057',
    '#89C65A',
    '#5AC671',
    '#41C05D',
    '#21BD4D',
    '#008D39',
  ];

  const intersection = [];
  p1.blocks.forEach((b1: any, bid: number) => {
    if (p2.blocks[bid].code === b1.code) {
      intersection.push(bid);
    }
  });

  if (onlyColor) {
    return hexList[intersection.length];
  }

  console.log(p1, p2, intersection);
  return `${intersection.length * 10}%`; // x10 to turn into percentage
};

const AppIndex = () => {
  const dataContext = useContext(DataContext);
  const { group, data }: { group: any; data: any } =
    dataContext === null ? { group: null, data: null } : dataContext;

  return (
    <div className="flex flex-wrap">
      {data && data.length !== 0 ? (
        <>
          <TableWrapper>
            <Table>
              <Thead>
                <Tr>
                  <Th mono>Matrix</Th>
                  {data.map((i: any) => (
                    <Th>{i.name}</Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {data.map((i: any) => (
                  <Tr>
                    <Td blue>{i.name}</Td>
                    {data.map((j: any) => (
                      <Td mono color={compareClasses(i, j, true)}>
                        {compareClasses(i, j)}
                      </Td>
                    ))}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableWrapper>
        </>
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
    </div>
  );
};

export default AppIndex;
