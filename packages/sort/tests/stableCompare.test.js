import { test } from "uvu";
import { ok, is } from "uvu/assert";
import { stableCompare } from "../src/utils/stableCompare";

test("compares numbers correctly", () => {
  ok(stableCompare(1, 3) < 0, "smaller value vs larger value");
  ok(stableCompare(5, 2) > 0, "larger value vs smaller value");
  is(stableCompare(4, 4), 0, "equal values");
});

test("compares correctly when using key as arg", () => {
  const subject = [
    { value: 1 }, //0
    { value: 3 }, //1
    { value: 4 }, //2
    { value: 3 } // 3
  ];

  ok(
    stableCompare(subject[0], subject[1], "value") < 0,
    "smaller value vs larger value"
  );
  ok(
    stableCompare(subject[2], subject[1], "value") > 0,
    "larger value vs smaller value"
  );
  is(stableCompare(subject[1], subject[3], "value"), 0, "equal values");
});

test("compares correctly with using function that returns number as arg", () => {
  const fn = (a, b) => b - a; // b smaller than a
  ok(stableCompare(1, 3, fn) > 0, "smaller value vs larger value");
  ok(stableCompare(5, 2, fn) < 0, "larger value vs smaller value");
  is(stableCompare(4, 4, fn), 0, "equal values");
});

test.run();
