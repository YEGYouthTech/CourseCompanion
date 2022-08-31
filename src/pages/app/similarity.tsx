import { useContext } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import styled, { css } from 'styled-components';

import { DataContext } from '@/templates/AppMain';
import compareClasses from '@/utils/compareClasses';

const Table = styled.table`
  position: relative;
  width: 100%;
  border-collapse: collapse;
  border-style: hidden;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 1rem;
  @media (max-width: 850px) {
    border-radius: 0px;
  }
`;

const Tbody = styled.tbody``;

const Thead = styled.thead``;

const Tr = styled.tr``;

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
  text-align: center;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-left: 1px solid #064e3b;
  border-right: 1px solid #064e3b;
  border-top: 1px solid #064e3b;
  border-bottom: 1px solid #064e3b;
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
    props.green &&
    css`
      background-color: #065f46;
      color: #d1fae5;
      font-weight: bold;
    `}
`;

const AppIndex = () => {
  const dataContext = useContext(DataContext);
  const { group, data }: { group: any; data: any } =
    dataContext === null ? { group: null, data: null } : dataContext;

  return (
    <div className="flex flex-wrap">
      <ScrollContainer className="mx-auto px-12 py-4 font-display">
        <Table>
          <Thead>
            <Tr>
              <Th mono white>
                Matrix
              </Th>
              {data.map((i: any) => (
                <Th>{i.name}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((i: any) => (
              <Tr>
                <Td green>{i.name}</Td>
                {data.map((j: any) => (
                  <Td mono color={compareClasses(i, j, false, true) as string}>
                    {compareClasses(i, j)}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </ScrollContainer>
    </div>
  );
};

export default AppIndex;
