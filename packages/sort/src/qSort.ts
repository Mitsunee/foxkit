import { CompareArgument, createComparison } from "./utils/compare";

/* eslint-disable no-redeclare */
export function qSort<T>(arr: Array<T>, sortBy?: CompareArgument<T>): Array<T> {
  const compare = createComparison(sortBy);

  function sort(arr: Array<T>): Array<T> {
    if (arr.length < 2) return arr;
    if (arr.length == 2) {
      if (compare(arr[1], arr[0])) return [arr[1], arr[0]];
      return arr;
    }

    const pivotIdx = Math.trunc(Math.random() * (arr.length - 1));
    const pivot = arr[pivotIdx];
    const smaller = new Array();
    const bigger = new Array();

    for (let i = 0; i < arr.length; i++) {
      if (i == pivotIdx) continue;
      const val = arr[i];
      if (compare(val, pivot)) smaller.push(val);
      else bigger.push(val);
    }

    return [...sort(smaller), pivot, ...sort(bigger)];
  }

  return sort(arr);
}
