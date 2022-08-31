import { useContext } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import { DataContext } from '@/templates/AppMain';

export default function AppTemplate() {
  const dataContext = useContext(DataContext);
  const { group, data } =
    dataContext === null ? { group: null, data: null } : dataContext;
  const { user } = useAuth();
  return (
    <div>
      <h1>Template</h1>
    </div>
  );
}
