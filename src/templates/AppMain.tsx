import { Main } from '@/templates/Main';

import AppNav from '../components/AppNav';

type IAppMainProps = {
  meta: React.ReactNode;
  children: React.ReactNode;
};

const AppMain = (props: IAppMainProps) => (
  <Main meta={props.meta}>
    <AppNav></AppNav>
    {props.children}
  </Main>
);

export default AppMain;
