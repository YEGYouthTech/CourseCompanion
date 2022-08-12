import { useState } from 'react';

import type { ICourse } from '../../lib/parseTimetable';

type IBlockProps = {
  index: number;
  header?: boolean;
  course?: ICourse;
  rainbow?: boolean;
};

type IBlocksProps = {
  blocks: ICourse[];
};

export function Block({ header, index, course, rainbow }: IBlockProps) {
  const rainbowColors = [
    'bg-red-200',
    'bg-orange-200',
    'bg-amber-200',
    'bg-yellow-200',
    'bg-lime-200',
    'bg-green-200',
    'bg-emerald-200',
    'bg-teal-200',
    'bg-cyan-200',
    'bg-sky-200',
    'bg-blue-200',
    'bg-indigo-200',
    'bg-violet-200',
    'bg-purple-200',
    'bg-fuchsia-200',
    'bg-pink-200',
    'bg-rose-300',
  ];
  const [tooltip, showTooltip] = useState(false);
  return (
    <>
      <div
        className={`relative inline-block w-20 ${header ? 'p-1' : 'p-2'} ${
          rainbow ? rainbowColors[index % rainbowColors.length] : ''
        }`}
        data-tip={!header ? course?.name || '[ERROR]' : undefined}
        onMouseEnter={() => {
          showTooltip(true);
        }}
        onMouseLeave={() => {
          showTooltip(false);
        }}
      >
        {header ? `Block ${index + 1}` : course?.code}
        {!header && tooltip ? (
          <div className="absolute top-0 left-1/2 z-[999] w-32 -translate-x-1/2 -translate-y-full whitespace-normal break-words rounded-lg bg-black py-1.5 px-3 text-sm font-normal text-white focus:outline-none">
            {course?.name || '[ERROR]'}
          </div>
        ) : undefined}
      </div>
    </>
  );
}

export function Blocks({ blocks }: IBlocksProps) {
  return (
    <>
      {blocks.map((_, i) => (
        <Block key={`blocksHeader${i}`} header={true} index={i} />
      ))}
      <br />
      {blocks.map((course, i) => (
        <Block
          key={`blocks${course.code}${i}`}
          index={i}
          course={course}
          rainbow={true}
        />
      ))}
    </>
  );
}
