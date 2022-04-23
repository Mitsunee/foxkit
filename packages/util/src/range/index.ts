import { isNum } from "../utils/isNum";

interface RangeArgWithEnd {
  start?: number;
  step?: number;
  end: number;
  length?: number;
}

interface RangeArgWithLength {
  start?: number;
  step?: number;
  end?: number;
  length: number;
}

type RangeArgs = RangeArgWithEnd | RangeArgWithLength;
type Range = number[];

export function range({ start = 0, step = 1, end, length }: RangeArgs): Range {
  if ((!isNum(end) && !isNum(length)) || !step) return []; // prevent infinite loop from missing args

  const arr = new Array();
  for (
    let i = start;
    (!isNum(end) ? true : step > 0 ? i <= end : i >= end) &&
    (!isNum(length) ? true : arr.length < length);
    i += step
  ) {
    arr.push(i);
  }

  return arr;
}
