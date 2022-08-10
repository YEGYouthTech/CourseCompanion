import type { ReactNode } from 'react';

import { Main } from '@/templates/Main';

import AppNav from '../components/AppNav';

type IAppMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const AppMain = (props: IAppMainProps) => (
  <Main meta={props.meta}>
    <AppNav></AppNav>
    {props.children}
  </Main>
);

export default AppMain;
