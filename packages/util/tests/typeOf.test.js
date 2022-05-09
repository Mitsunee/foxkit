import { test } from "uvu";
import { is } from "uvu/assert";
import { typeOf } from "../src/typeOf/index.ts";

test("Object types", () => {
  is(typeOf([]), "array");
  is(typeOf(new Set()), "set");
  is(typeOf(new Map()), "map");
  is(typeOf({}), "object");
});

test("classes", () => {
  class TestClass {}
  is(typeOf(new TestClass()), "testclass");
  is(typeOf(new Date()), "date");
});

test("primitives", () => {
  is(typeOf(true), "boolean");
  is(typeOf(42), "number");
  is(typeOf("hi"), "string");
});

test("no input", () => {
  is(typeOf(), "undefined");
});

test("edgecases", () => {
  is(typeOf(null), "null");
  is(typeOf(undefined), "undefined");
});

test.run();
