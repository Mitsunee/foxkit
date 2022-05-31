import { CompareArgument, compare } from "./utils/compare";

export function qSortDP<T>(
  arr: Array<T>,
  sortBy?: CompareArgument<T>
): Array<T> {
  if (arr.length < 2) return arr;
  if (arr.length == 2) {
    if (compare(arr[1], arr[0], sortBy)) return [arr[1], arr[0]];
    return arr;
  }

  let pivotLeft = arr[0];
  let pivotRight = arr[arr.length - 1];
  // if pivots aren't sorted, swap them (causes unstable sorting of duplicates)
  if (!compare(pivotLeft, pivotRight, sortBy)) {
    [pivotLeft, pivotRight] = [pivotRight, pivotLeft];
  }
  const small = new Array<T>();
  const mid = new Array<T>();
  const large = new Array<T>();

  for (let i = 1; i < arr.length - 1; i++) {
    const val = arr[i];
    if (compare(val, pivotLeft, sortBy)) {
      small.push(val);
      continue;
    }
    if (compare(val, pivotRight, sortBy)) {
      mid.push(val);
      continue;
    }
    large.push(val);
  }

  return [
    ...qSortDP(small, sortBy),
    pivotLeft,
    ...qSortDP(mid, sortBy),
    pivotRight,
    ...qSortDP(large, sortBy)
  ];
}
