import { Meta } from '@/layouts/Meta';
import AppMain from '@/templates/AppMain';

const AppClasses = () => (
  <AppMain meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />}>
    <h1 className="mb-2 pt-4 text-center font-display text-2xl font-bold text-gray-750">
      Classes
    </h1>
    <p className="mb-8 text-center font-body">
      This is where the group will access every class its members take and the
      members that are in each class.
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione fuga
      recusandae quidem. Quaerat molestiae blanditiis doloremque possimus labore
      voluptatibus distinctio recusandae autem esse explicabo molestias officia
      placeat, accusamus aut saepe.
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione fuga
      recusandae quidem. Quaerat molestiae blanditiis doloremque possimus labore
      voluptatibus distinctio recusandae autem esse explicabo molestias officia
      placeat, accusamus aut saepe.
    </p>
  </AppMain>
);

export default AppClasses;
