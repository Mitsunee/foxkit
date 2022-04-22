import { test } from "uvu";
import { equal, not } from "uvu/assert";
import { range } from "../src/range/index.js";

test("returns 0 to 5 given only end of 5", () => {
  equal(range({ end: 5 }), [0, 1, 2, 3, 4, 5]);
});

test("returns 1 to 5 given start of 1 and end of 5", () => {
  equal(range({ start: 1, end: 5 }), [1, 2, 3, 4, 5]);
});

test("returns valid range from 1 to 3 in steps of 0.5", () => {
  equal(range({ start: 1, end: 3, step: 0.5 }), [1, 1.5, 2, 2.5, 3]);
});

test("supports range with negative step", () => {
  equal(range({ start: 0, end: -5, step: -1 }), [0, -1, -2, -3, -4, -5]);
});

test("respects length of 10 property for range from 0 to 100", () => {
  equal(range({ end: 100, length: 10 }), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

test("returns false with no end and no length argument", () => {
  not(range({ start: 0 }));
});

test("returns false for step of 0 argument", () => {
  not(range({ end: 3, step: 0 }));
});

test("returns empty array for a start greater than end, but positive step", () => {
  equal(range({ start: 10, end: 0, step: 1 }), []);
});

test("returns empty array for a start less than end, but negative step", () => {
  equal(range({ start: 0, end: 10, step: -1 }), []);
});

test.run();
