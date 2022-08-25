import { test } from "uvu";
import * as assert from "uvu/assert";
import { List } from "../src/object/List.ts";

test("Can push elements to List", () => {
  const list = new List();

  // push first element
  list.push("lorem");
  assert.is(list.head, "lorem", "updated head");
  assert.is(list.tail, "lorem", "updated tail");
  assert.is(list.length, 1, "updated length");

  // push more
  list.push("ipsum").push("dolor");
  assert.is(list.head, "lorem", "first element unchanged");
  assert.is(list.tail, "dolor", "updated tail");
  assert.is(list.length, 3, "updated length");
});

test("Can pop elements from List", () => {
  const list = new List();
  list.push("lorem").push("ipsum").push("dolor");

  // pop once
  assert.is(list.pop(), "dolor", "popped tail");
  assert.is(list.tail, "ipsum", "updated tail");
  assert.is(list.length, 2, "updated length");

  // pop entire list
  list.pop();
  list.pop();
  assert.is(list.head, undefined, "cleared head");
  assert.is(list.tail, undefined, "cleared tail");
  assert.is(list.length, 0, "updated length");
});

test.run();
