export default function compareClasses(
  p1: any,
  p2: any,
  fullIntersection = false,
  onlyColor = false
) {
  if (!p1?.blocks?.length || !p2?.blocks?.length) {
    return 0;
  }
  // colors for 0% - 100%
  const hexList = [
    '#E33737',
    '#DA5639',
    '#FF5C28',
    '#D7B04B',
    '#C5C058',
    '#B1D057',
    '#89C65A',
    '#5AC671',
    '#41C05D',
    '#21BD4D',
    '#008D39',
  ];

  const intersection: Array<number> = [];
  p1.blocks.forEach((b1: any, bid: number) => {
    if (p2.blocks[bid].code === b1.code) {
      intersection.push(bid);
    }
  });

  if (fullIntersection) {
    return intersection;
  }

  if (onlyColor) {
    return hexList[intersection.length] as string;
  }

  console.log(p1, p2, intersection);
  return `${intersection.length * 10}%`; // x10 to turn into percentage
}
