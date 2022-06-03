import { stableCompare, StableCompareArgument } from "./utils/stableCompare";

export function stableQSort<T>(
  arr: Array<T>,
  sortBy?: StableCompareArgument<T>
): Array<T> {
  if (arr.length < 2) return arr;
  if (arr.length == 2) {
    if (stableCompare(arr[1], arr[0], sortBy) < 0) return [arr[1], arr[0]];
    return arr;
  }

  const pivotIdx = Math.trunc(Math.random() * (arr.length - 1));
  const pivot = arr[pivotIdx];
  const smaller = new Array();
  const bigger = new Array();

  for (let i = 0; i < arr.length; i++) {
    if (i == pivotIdx) continue;
    const val = arr[i];
    const res = stableCompare<T>(pivot, val, sortBy);
    if (res > 0 || (res == 0 && i < pivotIdx)) smaller.push(val);
    else bigger.push(val);
  }

  return [
    ...stableQSort(smaller, sortBy),
    pivot,
    ...stableQSort(bigger, sortBy)
  ];
}
