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
