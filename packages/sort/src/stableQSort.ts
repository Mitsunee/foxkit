import {
  StableCompareArgument,
  createStableComparison
} from "./utils/stableCompare";

export function stableQSort<T>(
  arr: Array<T>,
  sortBy?: StableCompareArgument<T>
): Array<T> {
  const compare = createStableComparison(sortBy);

  function sort(arr: Array<T>): Array<T> {
    if (arr.length < 2) return arr;
    if (arr.length == 2) {
      if (compare(arr[1], arr[0]) < 0) return [arr[1], arr[0]];
      return arr;
    }

    const pivotIdx = Math.trunc(Math.random() * (arr.length - 1));
    const pivot = arr[pivotIdx];
    const smaller = new Array();
    const bigger = new Array();

    for (let i = 0; i < arr.length; i++) {
      if (i == pivotIdx) continue;
      const val = arr[i];
      const res = compare(pivot, val);
      if (res > 0 || (res == 0 && i < pivotIdx)) smaller.push(val);
      else bigger.push(val);
    }

    return [...sort(smaller), pivot, ...sort(bigger)];
  }

  return sort(arr);
}
