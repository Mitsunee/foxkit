import { compare, CompareArgument } from "./utils/compare";

export function selSort<T>(
  input: Array<T>,
  sortBy?: CompareArgument<T>
): Array<T> {
  const arr: T[] = [...input];
  const res: T[] = new Array();

  while (arr.length >= 2) {
    // seek index of smallest element
    let min = 0;
    for (let i = 1; i < arr.length; i++) {
      if (compare(arr[i], arr[min], sortBy)) min = i;
    }

    // if possible swap first and smallest element (causes unstable sorting of duplicates)
    if (min > 0) {
      const firstEl = arr[0];
      const minEl = arr[min];
      arr[0] = minEl;
      arr[min] = firstEl;
    }

    // shift first element in working list into res
    res.push(arr.shift()!);
  }

  if (arr.length > 0) res.push(arr[0]); // put last element into result

  return res;
}
