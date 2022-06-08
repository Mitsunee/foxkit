import { stableCompare, StableCompareArgument } from "./utils/stableCompare";

export function stableQSortDP<T>(
  arr: Array<T>,
  sortBy?: StableCompareArgument<T>
): Array<T> {
  if (arr.length < 2) return arr;
  if (arr.length == 2) {
    if (stableCompare(arr[1], arr[0], sortBy) < 0) return [arr[1], arr[0]];
    return arr;
  }

  const pivotA = arr[0];
  const pivotB = arr[arr.length - 1];
  const small = new Array<T>();
  const mid = new Array<T>();
  const large = new Array<T>();

  if (stableCompare(pivotA, pivotB, sortBy) > 0) {
    for (let i = 1; i < arr.length - 1; i++) {
      const val = arr[i];
      if (stableCompare(val, pivotB, sortBy) <= 0) {
        small.push(val);
        continue;
      }
      if (stableCompare(val, pivotA, sortBy) < 0) {
        mid.push(val);
        continue;
      }
      large.push(val);
    }

    return [
      ...stableQSortDP(small, sortBy),
      pivotB,
      ...stableQSortDP(mid, sortBy),
      pivotA,
      ...stableQSortDP(large, sortBy)
    ];
  }

  for (let i = 1; i < arr.length - 1; i++) {
    const val = arr[i];
    if (stableCompare(val, pivotA, sortBy) < 0) {
      small.push(val);
      continue;
    }
    if (stableCompare(val, pivotB, sortBy) <= 0) {
      mid.push(val);
      continue;
    }
    large.push(val);
  }

  return [
    ...stableQSortDP(small, sortBy),
    pivotA,
    ...stableQSortDP(mid, sortBy),
    pivotB,
    ...stableQSortDP(large, sortBy)
  ];
}
