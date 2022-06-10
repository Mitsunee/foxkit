# Foxkit Sort

This package contains variations of the Quick Sort and Selection Sort algorithms as functions that take a sortBy argument similar to the callback paramter of `Array.prototype.sort`.

## Installation

```sh
yarn add -D @foxkit/sort
```

## Usage

```js
import { qSort } from "@foxkit/sort";

// sort by a <= b
qSort(myArr);

// sort by a.id <= b.id
qSort(myObjs, "id");

// sort using custom callback
qSort(myObjs, (a, b) => b.id - a.id); // descending order
```

The following algorithms are available:

- `qSort`: Quick Sort
- `qSortDP`: Dual-pivot Quick Sort
- `selSort`: Selection Sort

Note: Due to the nature of these algorithms duplicates may appear in random order. You can prevent this with a custom callback function if you have other properties available for comparison.

### Callback Function

The callback function may return any number (such as the result of a subtraction) or boolean (return `true` if `a` should come before `b`)

```js
selSort(myObjs, (a, b) => a.id > b.id); // descending order
```

## Stable Quick Sort

Stable variants of `qSort` and `qSortDP` are available in the `/stable` import. These are generally slower by a tiny amount but take the position in the original array into consideration, leading to deterministic results:

```js
import { qSort } from "@foxkit/sort/stable";

const myArr = [
  { v: 3, idx: 0 },
  { v: 1, idx: 1 },
  { v: 7, idx: 2 },
  { v: 3, idx: 3 }
];

qSort(myArr, "v"); /* results in:
[
  { v: 1, idx: 1 },
  { v: 3, idx: 0 },
  { v: 3, idx: 3 },
  { v: 7, idx: 2 }
] */
```

## Benchmarks

The following benchmarks were ran on Node.js 16.15.1 on an AMD Ryzen 5 5600X:

| Algorithm                      | Size 10              | Size 100          | Size 1000        |
| :----------------------------- | -------------------- | ----------------- | ---------------- |
| Quick Sort                     | 2,922,624 ops/s      | 154,397 ops/s     | 9,960 ops/s      |
| Quick Sort (stable)            | 2,849,336 ops/s      | 138,888 ops/s     | 9,272 ops/s      |
| Selection Sort                 | **17,031,188 ops/s** | 229,315 ops/s     | 3,916 ops/s      |
| Dual-Pivot Quick Sort          | 5,111,350 ops/s      | **340,698 ops/s** | **19,933 ops/s** |
| Dual-Pivot Quick Sort (stable) | 4,840,080 ops/s      | 314,799 ops/s     | 18,580 ops/s     |
