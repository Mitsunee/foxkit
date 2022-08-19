import { test } from "uvu";
import * as assert from "uvu/assert";
import { pickByKey } from "../src/object/pickByKey.ts";

test("pick defined elements", () => {
  const obj = {
    foo: "bar",
    bar: "baz",
    lorem: "ipsum"
  };
  const picked = pickByKey(obj, ["foo", "lorem"]);
  assert.is(picked.bar, undefined);
  assert.equal(picked, { foo: "bar", lorem: "ipsum" });
});

test("ignore bad keys", () => {
  const obj = {
    foo: "bar"
  };
  const picked = pickByKey(obj, ["foo", "lorem"]);
  assert.equal(picked, obj);
});

test.run();
