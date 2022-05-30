import { getRandomInt } from "./getRandomInt";

function randomizeArr(input) {
  let arr = [...input];
  const res = [];

  while (arr.length > 1) {
    const i = getRandomInt(0, arr.length);
    res.push(arr[i]);
    arr = [...arr.slice(0, i), ...arr.slice(i + 1)];
  }

  return [...res, ...arr];
}

export function toObjectSubject(arr) {
  const res = new Array();
  for (let idx = 0; idx < arr.length; idx++) {
    res.push({ val: arr[idx], idx });
  }
  return res;
}

export function genSubject({
  size = 20,
  skips = false,
  duplicates = false
} = {}) {
  let n = 0;
  const res = new Array();
  for (let i = 0; res.length < size; i++) {
    res.push(n);
    // handle duplicates (1:4 chance to add duplicate)
    if (duplicates && !getRandomInt(0, 3)) {
      continue; // next item will be duplicate
    }
    // handle skips (1:3 chance to add more than 1 to n)
    if (skips && !getRandomInt(0, 2)) {
      n += getRandomInt(2, 5); // next number with be 2 to 5 larger than previous instead of just 1
      continue;
    }
    n++;
  }

  return randomizeArr(res);
}
