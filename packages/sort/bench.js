import benchmark from "benchmark";
import { qSort } from "./src/qSort.ts";
import { stableQSort } from "./src/stableQSort.ts";
import { selSort } from "./src/selSort.ts";
import { qSortDP } from "./src/qSortDP.ts";
import { stableQSortDP } from "./src/stableQSortDP.ts";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

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

function genSubject({ size }) {
  const res = Array.from({ length: size }, (_, i) => i);
  return randomizeArr(res);
}

const size = isNaN(process.argv[2]) ? 100 : +process.argv[2];
console.log(`Generating test array of size ${size}`);
const subject = genSubject({ size });

console.log("Preparing Benchmark");
const suite = new benchmark.Suite();
suite.add("Quick Sort", () => qSort(subject));
suite.add("Quick Sort (stable)", () => stableQSort(subject));
suite.add("Selection Sort", () => selSort(subject));
suite.add("Dual-Pivot Quick Sort", () => qSortDP(subject));
suite.add("Dual-Pivot Quick Sort (stable)", () => stableQSortDP(subject));
suite.on("cycle", ({ target }) => console.log(String(target)));

console.log("Running Benchmark");
suite.run();
