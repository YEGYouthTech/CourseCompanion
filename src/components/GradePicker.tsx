import { Tab } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

type IGradePickerProps = {
  state: [number | null, React.Dispatch<React.SetStateAction<number | null>>];
};

export default function GradePicker({ state }: IGradePickerProps) {
  const grades = [0, 10, 11, 12];
  const [selected, setSelected] = state;

  return (
    <div className="max-w-md grow sm:px-0">
      <Tab.Group
        onChange={(e) => {
          setSelected(grades[e]);
        }}
        defaultIndex={selected ? grades.indexOf(selected) : 0}
      >
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {grades.map((grade) => (
            <Tab
              key={grade}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-gray-800 hover:bg-black/[0.12] hover:text-black',
                  grade === 0 ? 'w-0 -mr-1' : ''
                )
              }
            >
              {(grade !== 0 && `Grade ${grade}`) || ''}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
    </div>
  );
}
