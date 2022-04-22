import { test } from "uvu";
import { is } from "uvu/assert";
import { clamp } from "../src/clamp/clamp.js";

test("returns min for smaller value", () => {
  is(clamp({ value: 2, min: 5 }), 5);
});

test("returns min where min is 0 and value is negative", () => {
  is(clamp({ value: -2, min: 0 }), 0);
});

test("returns value with smaller min", () => {
  is(clamp({ value: 2, min: 0 }), 2);
});

test("returns max for larger value", () => {
  is(clamp({ value: 10, max: 5 }), 5);
});

test("returns max where max is 0 and value is positive", () => {
  is(clamp({ value: 2, max: 0 }), 0);
});

test("returns value with larger max", () => {
  is(clamp({ value: 5, max: 10 }), 5);
});

test("returns value for value between min and max", () => {
  is(clamp({ value: 5, min: 0, max: 10 }), 5);
});

test("returns value as only arg", () => {
  is(clamp({ value: 5 }), 5);
});

test.run();
