import { Meta } from "@/layouts/Meta";
import AppMain from "@/templates/AppMain";

const AppIndex = () => {
  return (
    <AppMain meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />}>
      <h1 className="mb-2 pt-4 text-center font-display text-2xl font-bold text-gray-750">
        Matrix
      </h1>
    </AppMain>
  );
};

export default AppIndex;
