import { test } from "uvu";
import { is, throws } from "uvu/assert";
import { convertUnits } from "../src/timers/convertUnits";

test("converts single unit", () => {
  is(convertUnits("1h"), 3600 * 1000, `Converts "1h" (1 hour)`);
  is(convertUnits("50secs"), 50 * 1000, `Converts "50secs")`);
});

test("converts multiple units", () => {
  is(convertUnits("1min30s"), 90 * 1000, `Converts "1min30s"`);
  is(convertUnits("1hour 60mins"), 3600 * 2 * 1000, `Converts "1hour 60mins"`);
});

test("throws if no match (strict)", () => {
  throws(() => convertUnits(""));
  throws(() => convertUnits("", true));
  throws(() => convertUnits("10bananas"));
  throws(() => convertUnits("10bananas", true));
});

test("returns 0 if no match (non-strict)", () => {
  is(convertUnits("", false), 0);
  is(convertUnits("10bananas", false), 0);
});

test("doesn't match trailing zeroes", () => {
  is(convertUnits("06s", false), 6000);
  throws(() => convertUnits("0h"));
});

test.run();
