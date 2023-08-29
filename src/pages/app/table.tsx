import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import ScrollContainer from 'react-indiana-drag-scroll';
import { Tooltip } from 'react-tippy';
import styled, { css } from 'styled-components';

import { courseCodeToColor } from '@/lib/osa';
import { DataContext } from '@/templates/AppMain';

const Table = styled.table`
  position: relative;
  width: 100%;
  border-collapse: collapse;
  border-style: hidden;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 1rem;
  cursor: grabbing;
  @media (max-width: 1340px) {
    border-radius: 0px;
  }
`;

const Tbody = styled.tbody``;

const Thead = styled.thead``;

const Tr = styled.tr<>``;

const Th = styled.th<{ left?: boolean; mono?: boolean; white?: boolean }>`
  background-color: #065f46;
  padding: 0.75rem;
  border-left: 1px solid #064e3b;
  border-right: 1px solid #064e3b;
  color: #d1fae5;
  ${(props) =>
    props.white &&
    css`
      color: white;
    `}
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
  green?: boolean;
  color?: string;
}>`
  vertical-align: middle;
  text-align: left;
  white-space: nowrap;
  border-left: 1px solid #064e3b;
  border-right: 1px solid #064e3b;
  border-top: 1px solid #064e3b;
  border-bottom: 1px solid #064e3b;
  min-width: 4rem;
  background-color: ${(props) => props.color && props.color};
  color: black;
  ${(props) =>
    props.mono &&
    css`
      font-family: Space Mono, monospace;
    `}

  ${(props) =>
    props.green &&
    css`
      background-color: #065f46;
      color: #d1fae5;
      font-weight: bold;
    `}
`;

const AppTable = () => {
  const rainbowColors = [
    '#fecaca',
    '#fed7aa',
    '#fde68a',
    '#fde047',
    '#d9f99d',
    '#bbf7d0',
    '#a7f3d0',
    '#99f6e4',
    '#a5f3fc',
    '#bae6fd',
    '#bfdbfe',
    '#c7d2fe',
  ];

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
      <ScrollContainer className="mx-auto mt-4 w-full px-12 pb-4 font-display">
        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Block 1</Th>
              <Th>Block 2</Th>
              <Th>Block 3</Th>
              <Th>Block 4</Th>
              <Th>Block 5</Th>
              <Th>Block 6</Th>
              <Th>Block 7</Th>
              <Th>Block 8</Th>
              <Th>Block 9</Th>
              <Th>Block 10</Th>
            </Tr>
          </Thead>
          <Tbody>
            {(data as any).map((timetable: any) => (
              <Tr>
                <Td green>
                  <span className="block h-full w-full px-5 py-1">
                    {timetable.name}
                  </span>
                </Td>
                {timetable.blocks.map((block: any, idx: number) => (
                  // <Td mono color={rainbowColors[idx]}>
                  <Td mono color={courseCodeToColor(block.code)}>
                    <Tooltip title={block.name} trigger="click">
                      <span className="block h-full w-full px-5 py-1">
                        {block.code}
                      </span>
                    </Tooltip>
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </ScrollContainer>
    </>
  );
};

export default AppTable;
