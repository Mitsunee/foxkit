import { CompareArgument, compare } from "./utils/compare";

/* eslint-disable no-redeclare */
export function qSort<T>(arr: Array<T>, sortBy?: CompareArgument<T>): Array<T> {
  if (!arr?.length) return [];
  if (arr.length == 1) return arr;
  if (arr.length == 2) {
    if (compare(arr[1], arr[0], sortBy)) return [arr[1], arr[0]];
    return arr;
  }

  const pivotIdx = Math.trunc(Math.random() * (arr.length - 1));
  const pivot = arr[pivotIdx];
  const smaller = new Array();
  const bigger = new Array();

  for (let i = 0; i < arr.length; i++) {
    if (i == pivotIdx) continue;
    const val = arr[i];
    if (compare<T>(val, pivot, sortBy)) smaller.push(val);
    else bigger.push(val);
  }

  return [...qSort(smaller, sortBy), pivot, ...qSort(bigger, sortBy)];
}
