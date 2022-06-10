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
  duplicates = false,
  log = false
} = {}) {
  const len = Math.max(3, size);
  let n = 0;
  const res = new Array();
  for (let i = 0; res.length < len; i++) {
    res.push(n);
    // handle duplicates (1:4 chance to add duplicate)
    if (duplicates && !getRandomInt(0, 3)) {
      if (log) console.log("added duplicate");
      continue; // next item will be duplicate
    }
    // handle skips (1:3 chance to add more than 1 to n)
    if (skips && !getRandomInt(0, 2)) {
      if (log) console.log("skipped value");
      n += getRandomInt(2, 5); // next number with be 2 to 5 larger than previous instead of just 1
      continue;
    }
    n++;
  }

  // make sure at least one skip and duplicate exist if intended
  if (
    (skips && !res.some((el, i) => i == 0 || el - 1 > res[i - 1])) ||
    (duplicates && !res.some((el, i) => el == res[i + 1]))
  ) {
    if (log) console.log("retrying random subject");
    return genSubject({ size, skips, duplicates }); // try again recursively
  }

  const randomized = randomizeArr(res);
  if (log) {
    console.log("res", res);
    console.log("randomized", randomized);
  }
  return randomized;
}
