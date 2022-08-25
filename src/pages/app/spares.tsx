import { useContext } from 'react';

import { DataContext } from '@/templates/AppMain';

const AppSpares = () => {
  const dataContext = useContext(DataContext);
  const { group, data } =
    dataContext === null ? { group: null, data: null } : dataContext;
  return (
    <>
      <h1 className="mb-2 pt-4 text-center font-display text-2xl font-bold text-gray-750">
        Spares
      </h1>
      <p className="mb-8 text-center font-body">
        Currently in development.
        <br />
        Please check back later.
      </p>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </>
  );
};

export default AppSpares;
