import { test } from "uvu";
import { ok, is } from "uvu/assert";
import { createStableComparison } from "../src/utils/stableCompare";

test("compares numbers correctly", () => {
  const compare = createStableComparison();
  ok(compare(1, 3) < 0, "smaller value vs larger value");
  ok(compare(5, 2) > 0, "larger value vs smaller value");
  is(compare(4, 4), 0, "equal values");
});

test("compares correctly when using key as arg", () => {
  const compare = createStableComparison("value");
  const subject = [
    { value: 1 }, //0
    { value: 3 }, //1
    { value: 4 }, //2
    { value: 3 } // 3
  ];

  ok(compare(subject[0], subject[1]) < 0, "smaller value vs larger value");
  ok(compare(subject[2], subject[1]) > 0, "larger value vs smaller value");
  is(compare(subject[1], subject[3]), 0, "equal values");
});

test("compares correctly with using function that returns number as arg", () => {
  const compare = createStableComparison((a, b) => b - a); // b smaller than a
  ok(compare(1, 3) > 0, "smaller value vs larger value");
  ok(compare(5, 2) < 0, "larger value vs smaller value");
  is(compare(4, 4), 0, "equal values");
});

test.run();
