import { test } from "uvu";
import { ok, not } from "uvu/assert";
import { compare } from "../src/utils/compare";

test("compares numbers correctly", () => {
  ok(compare(1, 3), "smaller value vs larger value");
  not(compare(5, 2), "larger value vs smaller value");
  ok(compare(4, 4), "equal values");
});

test("compares correctly when using key as arg", () => {
  const subject = [
    { value: 1 }, //0
    { value: 3 }, //1
    { value: 4 }, //2
    { value: 3 } // 3
  ];

  ok(compare(subject[0], subject[1], "value"), "smaller value vs larger value");
  not(
    compare(subject[2], subject[1], "value"),
    "larger value vs smaller value"
  );
  ok(compare(subject[1], subject[3], "value"), "equal values");
});

test("compares correctly with using function that returns boolean as arg", () => {
  const fn = (a, b) => a < b; // a smaller than b
  ok(compare(1, 3, fn), "smaller value vs larger value");
  not(compare(5, 2, fn), "larger value vs smaller value");
  not(compare(4, 4, fn), "equal values");
});

test("compares correctly with using function that returns number as arg", () => {
  const fn = (a, b) => b - a; // b smaller than a
  not(compare(1, 3, fn), "smaller value vs larger value");
  ok(compare(5, 2, fn), "larger value vs smaller value");
  ok(compare(4, 4, fn), "equal values");
});

test.run();
