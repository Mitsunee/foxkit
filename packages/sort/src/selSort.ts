import { CompareArgument, createComparison } from "./utils/compare";

export function selSort<T>(
  arr: Array<T>,
  sortBy?: CompareArgument<T>
): Array<T> {
  const compare = createComparison(sortBy);
  const res: T[] = [...arr];
  let pointer = 0;

  while (pointer < res.length - 1) {
    // seek index of smallest element after pointer
    let min = pointer;
    for (let i = pointer + 1; i < res.length; i++) {
      if (compare(res[i], res[min])) min = i;
    }

    // if possible swap at pointer and smallest element (causes unstable sorting of duplicates)
    if (min > pointer) {
      const firstEl = res[pointer];
      const minEl = res[min];
      res[pointer] = minEl;
      res[min] = firstEl;
    }

    // move pointer
    pointer++;
  }

  //if (arr.length > 0) res.push(arr[0]); // put last element into result

  return res;
}
