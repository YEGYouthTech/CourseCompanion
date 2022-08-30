import { useContext } from "react";
import styled, { css } from "styled-components";

import { DataContext } from "@/templates/AppMain";

const Header = styled.h1<{ secondary?: boolean }>`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
  color: white;
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

const AppData = () => {
  const dataContext = useContext(DataContext);
  const { group, data }: { group: any; data: any } =
    dataContext === null ? { group: null, data: null } : dataContext;
  return (
    <div className="flex flex-wrap">
      {data.map((i: any) => (
        <>
          <TableWrapper>
            <Header>{i?.name}</Header>
            <Header secondary>
              {i?.school} &#8226; {i?.timePeriod}
            </Header>
            <Table>
              <Thead>
                <Tr>
                  <Th>Block</Th>
                  <Th left>Course</Th>
                  <Th>Code</Th>
                  <Th left>Teacher</Th>
                  <Th>Room</Th>
                  {/* <Th>Duration</Th> */}
                </Tr>
              </Thead>
              <Tbody>
                {i?.blocks?.map((j: any, blockid: number) => (
                  <Tr key={blockid} secondary={blockid % 2 === 0}>
                    <Td>{blockid + 1}</Td>
                    <Td>{j.name}</Td>
                    <Td mono color={(blockid + 1) as any}>
                      {j.code}
                    </Td>
                    <Td>{j.teacher ? j.teacher.name : "N/A"}</Td>
                    <Td mono>{j.room ? j.room : "N/A"}</Td>
                    {/* <Td>
                        {j.duration !== null ? `${j.duration} hrs` : 'N/A'}
                      </Td> */}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableWrapper>
        </>
      ))}
    </div>
  );
};

export default AppData;
