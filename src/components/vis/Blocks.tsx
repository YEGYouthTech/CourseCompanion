import { useState } from "react";

import type { ICourse } from "../../lib/parseTimetable";

type IBlockProps = {
  index: number;
  header?: boolean;
  course?: ICourse;
  rainbow?: boolean;
};

type IBlocksProps = {
  blocks: ICourse[];
  hideHeader?: boolean;
  nameHeader?: string;
};

export function Block({ header, index, course, rainbow }: IBlockProps) {
  const rainbowColors = [
    "bg-red-200",
    "bg-orange-200",
    "bg-amber-200",
    "bg-yellow-200",
    "bg-lime-200",
    "bg-green-200",
    "bg-emerald-200",
    "bg-teal-200",
    "bg-cyan-200",
    "bg-sky-200",
    "bg-blue-200",
    "bg-indigo-200",
    "bg-violet-200",
    "bg-purple-200",
    "bg-fuchsia-200",
    "bg-pink-200",
    "bg-rose-300",
  ];
  const [tooltip, showTooltip] = useState(false);
  return (
    <>
      <div
        className={`font-mono relative inline-block h-[37px] w-20 ${
          header ? "p-1" : "p-2"
        } ${rainbow ? rainbowColors[index % rainbowColors.length] : ""}`}
        data-tip={!header ? course?.name || "[ERROR]" : undefined}
        onMouseEnter={() => {
          showTooltip(true);
        }}
        onMouseLeave={() => {
          showTooltip(false);
        }}
      >
        {header ? `Block ${index + 1}` : course?.code}
        {course?.name ? (
          <div
            className={`absolute top-0 left-1/2 z-[999] hidden w-32 -translate-x-1/2 -translate-y-full whitespace-normal break-words rounded-lg bg-black py-1.5 px-3 text-sm font-normal text-white focus:outline-none ${
              !header && tooltip && "!block"
            }`}
          >
            <span className="text-[0px]">&nbsp;</span>
            {course?.name || "[ERROR]"}
          </div>
        ) : undefined}
        <span className="absolute h-0">
          <br />
        </span>
      </div>
    </>
  );
}

export function Blocks({ blocks, hideHeader, nameHeader }: IBlocksProps) {
  return (
    <>
      {!hideHeader &&
        blocks.map((_, i) => (
          <>
            {nameHeader && i === 0 && (
              <div className="relative inline-block w-32 p-1 ">
                <div className="font-body text-sm"></div>
              </div>
            )}
            <Block key={`blocksHeader${i}`} header={true} index={i} />
          </>
        ))}
      <br />
      {blocks.map((course, i) => (
        <>
          {nameHeader && i === 0 && (
            <div className="relative inline-block w-32 p-1 ">
              <div className="font-body text-sm text-white font-semibold">
                {nameHeader}
              </div>
            </div>
          )}
          <Block
            key={`blocks${course.code}${i}`}
            index={i}
            course={course}
            rainbow={true}
          />
        </>
      ))}
    </>
  );
}
