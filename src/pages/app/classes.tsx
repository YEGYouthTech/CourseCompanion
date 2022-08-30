import { useContext, useState } from "react";
import styled, { css } from "styled-components";

import { DataContext } from "@/templates/AppMain";

import UserPicker from "../../components/UserPicker";

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
  width: min(100vw, 60rem);
  margin-left: auto;
  margin-right: auto;
  margin-top: 1rem;
  overflow: hidden;
`;

const Table = styled.table`
  position: relative;
  width: 100%;
  border-style: hidden;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 1rem;
  @media (max-width: 850px) {
    border-radius: 0px;
  }
`;

const Tbody = styled.tbody`
  border-style: hidden;
  border-radius: 10px;
`;

const Thead = styled.thead``;

const Tr = styled.tr<{ secondary?: boolean }>`
  background-color: #a7f3d0;
  color: #065f46;
  ${(props) =>
    props.secondary &&
    css`
      background-color: #d1fae5;
    `}
`;

const Th = styled.th<{ left?: boolean; mono?: boolean }>`
  background-color: #065f46;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  border-left: 1px solid #064e3b;
  border-right: 1px solid #064e3b;
  color: #d1fae5;
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
  colSpan?: string;
}>`
  border-left: 1px solid #6ee7b7;
  border-right: 1px solid #6ee7b7;
  vertical-align: middle;
  text-align: center;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  min-width: 4rem;
  background-color: ${(props) => props.color && props.color};
  font-weight: 500;
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

const Center = styled.div`
  display: flex;
  justify-content: center;
`;

const AppClasses = () => {
  const selectedState1 = useState(null);
  const selectedState2 = useState(null);
  const dataContext = useContext(DataContext);
  const { group, data } =
    dataContext === null ? { group: null, data: null } : dataContext;
  const getIntersection = (userId1: any, userId2: any) => {
    if (!userId1 || !userId2) {
      return [];
    }
    const user1 = data.find((timetable: any) => timetable.uid === userId1);
    const user2 = data.find((timetable: any) => timetable.uid === userId2);
    if (!user1 || !user2) {
      return [];
    }
    const intersection = user1.blocks
      .map((block: any, index: number) => ({ ...block, bid: index + 1 } as any))
      .filter((block: any, bid: number) =>
        user2.blocks.some(
          (block2: any, bid2: number) =>
            block2.code === block.code && bid === bid2
        )
      );
    return intersection;
  };

  const tableData = getIntersection(
    selectedState1[0]?.uid,
    selectedState2[0]?.uid
  );

  return (
    <>
      <h1 className="mb-2 pt-4 text-center font-display text-2xl font-bold text-white">
        Classes
      </h1>
      <div className="flex flex-col">
        <Center>
          <div>
            <div className="flex gap-5">
              <UserPicker
                selectedState={selectedState1}
                onSelect={() => {}}
                showButton={false}
              />
              <UserPicker
                selectedState={selectedState2}
                onSelect={() => {}}
                showButton={false}
              />
            </div>
            <div className="mt-2 flex gap-7 text-red-400 font-bold">
              <span className="w-56 text-left text-xs">
                {!data.find(
                  (timetable: any) => timetable.uid === selectedState1[0]?.uid
                )?.blocks?.length && "User's timetable not found in group"}
              </span>
              <span className="w-56 text-left text-xs">
                {!data.find(
                  (timetable: any) => timetable.uid === selectedState2[0]?.uid
                )?.blocks?.length && "User's timetable not found in group"}
              </span>
            </div>
          </div>
        </Center>
      </div>
      {tableData && (
        <TableWrapper>
          <Table>
            <Thead>
              <Tr>
                <Th>Block</Th>
                <Th>Class</Th>
                <Th>Code</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tableData.length > 0 ? (
                tableData.map((i: any, idx: number) => (
                  <Tr secondary={idx % 2 === 0}>
                    <Td mono>{i.bid}</Td>
                    <Td>{i.name}</Td>
                    <Td mono>{i.code}</Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={"3" as any}>No Data</Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableWrapper>
      )}
    </>
  );
};

export default AppClasses;
