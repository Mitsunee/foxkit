import {
  StableCompareArgument,
  createStableComparison
} from "./utils/stableCompare";

export function stableQSortDP<T>(
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

    const pivotA = arr[0];
    const pivotB = arr[arr.length - 1];
    const small = new Array<T>();
    const mid = new Array<T>();
    const large = new Array<T>();

    if (compare(pivotA, pivotB) > 0) {
      for (let i = 1; i < arr.length - 1; i++) {
        const val = arr[i];
        if (compare(val, pivotB) <= 0) {
          small.push(val);
          continue;
        }
        if (compare(val, pivotA) < 0) {
          mid.push(val);
          continue;
        }
        large.push(val);
      }

      return [...sort(small), pivotB, ...sort(mid), pivotA, ...sort(large)];
    }

    for (let i = 1; i < arr.length - 1; i++) {
      const val = arr[i];
      if (compare(val, pivotA) < 0) {
        small.push(val);
        continue;
      }
      if (compare(val, pivotB) <= 0) {
        mid.push(val);
        continue;
      }
      large.push(val);
    }

    return [...sort(small), pivotA, ...sort(mid), pivotB, ...sort(large)];
  }

  return sort(arr);
}
