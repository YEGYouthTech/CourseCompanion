import { useContext } from "react";

import { DataContext } from "@/templates/AppMain";

import styled, { css } from "styled-components";

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
`;

const TableWrapper = styled.div`
  padding-right: 3rem;
  padding-left: 3rem;
  font-family: Gilroy, sans-serif;
  padding-bottom: 1rem;
`;

const Table = styled.table`
  position: relative;
  width: 100%;
  border-collapse: collapse;
  border-style: hidden;
  border-radius: 5px;
  box-shadow: 0 0 0 1px #666;
  margin-top: 1rem;
`;

const Tbody = styled.tbody``;

const Thead = styled.thead``;

const Tr = styled.tr`
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
`;

const Th = styled.th<{ left?: boolean }>`
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  border-left: 1px solid gray;
  border-right: 1px solid gray;
  ${(props) =>
    props.left &&
    css`
      text-align: left;
      padding-left: 2.5rem;
      padding-right: 2.5rem;
    `}
`;

const Td = styled.td<{ left?: boolean; mono?: boolean }>`
  vertical-align: middle;
  text-align: center;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-left: 1px solid gray;
  border-right: 1px solid gray;
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  ${(props) =>
    props.left &&
    css`
      text-align: left;
      width: 500px;
    `}

  ${(props) =>
    props.mono &&
    css`
      font-family: Space Mono, monospace;
    `}
`;

const AppData = () => {
  const dataContext = useContext(DataContext);
  const { group, data }: { group: any; data: any } =
    dataContext === null ? { group: null, data: null } : dataContext;
  return (
    <>
      {data && data.length !== 0 ? (
        data.map((i: any) => (
          <>
            <TableWrapper>
              <Header>{i?.name}</Header>
              <Header secondary>
                {i?.school} &#8226; {i?.timePeriod}
              </Header>
              <Table>
                <Thead>
                  <Tr>
                    <Th left>Block</Th>
                    <Th>Code</Th>
                    <Th left>Teacher</Th>
                    <Th>Room</Th>
                    <Th>Duration</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {i?.blocks.map((j: any) => (
                    <Tr>
                      <Td left>{j.name}</Td>
                      <Td mono>{j.code}</Td>
                      <Td left>{j.teacher ? j.teacher.name : "N/A"}</Td>
                      <Td mono>{j.room ? j.room : "N/A"}</Td>
                      <Td>
                        {j.duration !== null ? `${j.duration} hrs` : "N/A"}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableWrapper>
          </>
        ))
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

export default AppData;
