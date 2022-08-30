import { useContext } from "react";
import { Tooltip } from "react-tippy";
import { DataContext } from "@/templates/AppMain";

import styled, { css } from "styled-components";

const TableWrapper = styled.div`
  padding-right: 3rem;
  padding-left: 3rem;
  font-family: Gilroy, sans-serif;
  padding-bottom: 1rem;
  padding-top: 0rem;
  @media (max-width: 1340px) {
    padding-right: 0rem;
    padding-left: 0rem;
    width: 100%;
    overflow-x: auto;
    padding-top: 1rem;
    padding-bottom: 0;
  }
  max-width: 100rem;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1rem;
  overflow: hidden;
`;

const Table = styled.table`
  position: relative;
  width: 100%;
  border-collapse: collapse;
  border-style: hidden;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 1rem;
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
  padding-top: 0.65rem;
  padding-bottom: 0.65rem;
  border-left: 1px solid #064e3b;
  border-right: 1px solid #064e3b;
  border-top: 1px solid #064e3b;
  border-bottom: 1px solid #064e3b;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
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
    "#fecaca",
    "#fed7aa",
    "#fde68a",
    "#fde047",
    "#d9f99d",
    "#bbf7d0",
    "#a7f3d0",
    "#99f6e4",
    "#a5f3fc",
    "#bae6fd",
    "#bfdbfe",
    "#c7d2fe",
  ];

  const dataContext = useContext(DataContext);
  const { group, data } =
    dataContext === null ? { group: null, data: null } : dataContext;
  console.log(data);
  return (
    <>
      <TableWrapper>
        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>0</Th>
              <Th>1</Th>
              <Th>2</Th>
              <Th>3</Th>
              <Th>4</Th>
              <Th>5</Th>
              <Th>6</Th>
              <Th>7</Th>
              <Th>8</Th>
              <Th>9</Th>
            </Tr>
          </Thead>
          <Tbody>
            {(data as any).map((timetable: any) => (
              <Tr>
                <Td green>{timetable.name}</Td>
                {timetable.blocks.map((block: any, idx: number) => (
                  <Td mono color={rainbowColors[idx]}>
                    <Tooltip title={block.name}>{block.code}</Tooltip>
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableWrapper>
    </>
  );
};

export default AppTable;
