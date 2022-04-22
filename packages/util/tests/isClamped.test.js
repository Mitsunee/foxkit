import { test } from "uvu";
import { ok, not } from "uvu/assert";
import { isClamped } from "../src/clamp/isClamped.js";

test("returns false for min > value", () => {
  not(isClamped({ value: 2, min: 5 }));
});

test("returns true for min < value", () => {
  ok(isClamped({ value: 2, min: 0 }));
});

test("returns false max < value", () => {
  not(isClamped({ value: 10, max: 5 }));
});

test("returns true for max > value", () => {
  ok(isClamped({ value: 5, max: 10 }));
});

test("returns true for value between min and max", () => {
  ok(isClamped({ value: 5, min: 0, max: 10 }));
});

test("returns true for value as only arg", () => {
  ok(isClamped({ value: 5 }));
});

test.run();
