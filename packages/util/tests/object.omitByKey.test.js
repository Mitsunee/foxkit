import { test } from "uvu";
import * as assert from "uvu/assert";
import { omitByKey } from "../src/object/omitByKey.ts";

test("pick defined elements", () => {
  const obj = {
    foo: "bar",
    bar: "baz",
    lorem: "ipsum"
  };
  const omitted = omitByKey(obj, ["foo", "lorem"]);
  assert.is(omitted.foo, undefined);
  assert.equal(omitted, { bar: "baz" });
});

test("ignore bad keys", () => {
  const obj = {
    foo: "bar"
  };
  assert.equal(omitByKey(obj, ["lorem"]), obj);
});

test.run();
