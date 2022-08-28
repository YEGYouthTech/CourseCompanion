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
  width: min(100vw, 60rem);
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

const ImgWrapper = styled.div`
  margin-bottom: -1rem;
  margin-top: -1rem;
  transform: scale(0.4);
  -webkit-transform: scale(0.4);
  -moz-transform: scale(0.4);
  -ms-transform: scale(0.4);
  -o-transform: scale(0.4);
`;

const ImgSpan = styled.span`
  position: relative;
  display: inline-block;
  border-radius: 50%;
  overflow: hidden;
  width: 100px;
  &:not(:first-child) {
    margin-left: -60px;
    -webkit-mask: radial-gradient(
      circle 55px at 5px 50%,
      transparent 99%,
      #fff 100%
    );
    mask: radial-gradient(circle 60px at 5px 50%, transparent 99%, #fff 100%);
  }
`;

const Tooltip = styled.div`
  position: absolute;
  opacity: 0;
  transition: all 0.1s ease-in-out;
  background-color: black;
  color: white;
  visibility: hidden;
  font-family: Gilroy;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  padding-top: 0.2rem;
  border-radius: 0.25rem;
  font-size: 0.85rem;
`;

const TooltipWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  transition: all 0.5s ease-in-out;
  &:hover {
    & ${Tooltip} {
      visibility: visible;
      opacity: 1;
    }
  }
`;

const PFP = styled.img`
  width: 100%;
  display: block;
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

  const tooltipGen = (name: string, idx: number, len: number) => {
    if (idx > 2) {
      return '';
    }
    if (idx === 2) {
      return '...';
    }
    if (idx === 1 || len === 1) {
      return name;
    }
    return `${name}, `;
  };

  return data && data.length !== 0 ? (
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
                  <TooltipWrapper>
                    <ImgWrapper>
                      {i.mutuals.map((j) => (
                        <ImgSpan>
                          <PFP
                            src={j.profileImage}
                            alt={j.name}
                            title={j.name}
                          />
                        </ImgSpan>
                      ))}
                    </ImgWrapper>
                    <Tooltip>
                      {i.mutuals.map((j, idx) =>
                        tooltipGen(j.name, idx, i.mutuals.length)
                      )}
                    </Tooltip>
                  </TooltipWrapper>
                </Td>
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
    </>
  );
};

export default AppMutuals;
