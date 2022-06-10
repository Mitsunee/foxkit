import { CompareArgument, createComparison } from "./utils/compare";

export function qSortDP<T>(
  arr: Array<T>,
  sortBy?: CompareArgument<T>
): Array<T> {
  const compare = createComparison(sortBy);

  function sort(arr: Array<T>): Array<T> {
    if (arr.length < 2) return arr;
    if (arr.length == 2) {
      if (compare(arr[1], arr[0])) return [arr[1], arr[0]];
      return arr;
    }

    let pivotLeft = arr[0];
    let pivotRight = arr[arr.length - 1];
    // if pivots aren't sorted, swap them (causes unstable sorting of duplicates)
    if (!compare(pivotLeft, pivotRight)) {
      [pivotLeft, pivotRight] = [pivotRight, pivotLeft];
    }
    const small = new Array<T>();
    const mid = new Array<T>();
    const large = new Array<T>();

    for (let i = 1; i < arr.length - 1; i++) {
      const val = arr[i];
      if (compare(val, pivotLeft)) {
        small.push(val);
        continue;
      }
      if (compare(val, pivotRight)) {
        mid.push(val);
        continue;
      }
      large.push(val);
    }

    return [
      ...sort(small),
      pivotLeft,
      ...sort(mid),
      pivotRight,
      ...sort(large)
    ];
  }

  return sort(arr);
}
