import type { ReactNode } from 'react';

import Nav from '@/components/nav.jsx';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <>
    <Nav></Nav>

    {props.meta}

    {/* <header className="mt-16 bg-gray-900 text-gray-200">
      <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-100">{AppConfig.title}</h1>
        <div className="text-xl">{AppConfig.description}</div>
      </div>
    </header> */}
    {props.children}
    {/* <main>
      <div className="content py-5 text-xl"></div>
    </main> */}
    {/* <footer className="w-full border-t border-gray-300 px-1 py-8 text-center text-sm text-gray-700 antialiased">
      © Copyright {new Date().getFullYear()} {AppConfig.title}. All rights
      reserved.
    </footer> */}
  </>
);

export { Main };
