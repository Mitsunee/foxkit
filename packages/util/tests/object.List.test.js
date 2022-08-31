import { test } from "uvu";
import * as assert from "uvu/assert";
import { List } from "../src/object/List.ts";

const lorem = [
  "lorem", // 0
  "ipsum", // 1
  "dolor", // 2
  "sit", // 3
  "amet", // 4
  "consectetur", // 5
  "adipisicing" // 6
]; // length: 7

test("Can push elements into List", () => {
  const list = new List();

  // push first element
  assert.is(list.push("lorem"), list, "return this");
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

  // empty list
  assert.is(list.pop(), undefined, "return undefined for empty list");
});

test("Can shift elements from List", () => {
  const list = new List();
  list.push("lorem").push("ipsum").push("dolor");

  // shift once
  assert.is(list.shift(), "lorem", "shifted head");
  assert.is(list.head, "ipsum", "updated head");
  assert.is(list.length, 2, "updated length");

  // shift entire list
  list.shift();
  list.shift();
  assert.is(list.head, undefined, "cleared head");
  assert.is(list.tail, undefined, "cleared tail");
  assert.is(list.length, 0, "updated length");

  // empty list
  assert.is(list.shift(), undefined, "return undefined for empty list");
});

test("Can unshift elements into List", () => {
  const list = new List();

  // unshift first element
  assert.is(list.unshift("dolor"), list, "return this");
  assert.is(list.head, "dolor", "updated head");
  assert.is(list.tail, "dolor", "updated tail");
  assert.is(list.length, 1, "updated length");

  // unshift more
  list.unshift("ipsum").unshift("lorem");
  assert.is(list.head, "lorem", "updated head");
  assert.is(list.tail, "dolor", "tail unchanged");
  assert.is(list.length, 3, "updated length");
});

test("Can get ListNode by index", () => {
  const list = new List();

  // empty list
  assert.is(list.getNode(0), undefined, "return undefined for empty list");

  // fill list
  for (const item of lorem) list.push(item);

  // number out of range
  assert.is(
    list.getNode(-1),
    undefined,
    "reject negative number with undefined"
  );
  assert.is(
    list.getNode(7),
    undefined,
    "reject number greater or equal to length with undefined"
  );
  assert.is(
    list.getNode(8),
    undefined,
    "reject number greater or equal to length with undefined"
  );

  // correct values
  for (let i = 0; i < lorem.length; i++) {
    assert.is(
      list.getNode(i)?.value,
      lorem[i],
      `get Node from list for index ${i}`
    );
  }
});

test("Can get value by index", () => {
  const list = new List();

  // empty list
  assert.is(list.get(0), undefined, "return undefined for empty list");

  // fill list
  for (const item of lorem) list.push(item);

  // number out of range
  assert.is(list.get(-1), undefined, "reject negative number with undefined");
  assert.is(
    list.get(7),
    undefined,
    "reject number greater or equal to length with undefined"
  );
  assert.is(
    list.get(8),
    undefined,
    "reject number greater or equal to length with undefined"
  );

  // correct values
  for (let i = 0; i < lorem.length; i++) {
    assert.is(list.get(i), lorem[i], `get value from list for index ${i}`);
  }
});

test("Can set value by index", () => {
  const list = new List();
  list.push("lorem").push("ipsum").push("dolor");

  // invalid index
  assert.not(list.set(-1, "foobar"), "reject negative number with false");
  assert.not(
    list.set(4, "foobar"),
    "reject number greater than length with false"
  );

  // set index 1 to foobar
  assert.ok(list.set(1, "foobar"), "don't reject good index");
  assert.is(list.get(1), "foobar", "set value");

  // set index equal to length (aka push)
  assert.ok(
    list.set(list.length, "barbaz"),
    "don't reject index equal to length"
  );
  assert.is(list.tail, "barbaz", "correctly pushed element");
  assert.is(list.length, 4, "correctly pushed element");
});

test("Can insert value into list", () => {
  const list = new List();

  // bad index
  assert.not(list.insert(-1, "bad"), "reject negative index with false");

  list.push("lorem").push("ipsum").push("dolor");

  // can unshift
  assert.ok(list.insert(0, "UNSHIFTED"), "return true");
  assert.is(list.head, "UNSHIFTED", "correctly unshifted element into list");
  assert.is(list.length, 4, "updated length after unshift");

  // can push
  assert.ok(list.insert(4, "PUSHED"), "return true");
  assert.is(list.tail, "PUSHED", "correctly pushed element into list");
  assert.is(list.length, 5, "updated length after push");

  // can insert
  assert.ok(list.insert(2, "INSERTED"), "return true");
  assert.is(list.get(1), "lorem", "correctly inserted element into list");
  assert.is(list.get(2), "INSERTED", "correctly inserted element into list");
  assert.is(list.get(3), "ipsum", "correctly inserted element into list");
  assert.is(list.length, 6, "updated length after insert");

  // bad indexes
  assert.not(list.insert(7), "reject index larger than length with false");
});

test("can remove elements from list", () => {
  const list = new List();

  // bad input
  assert.not(list.remove(-1), "reject negative index with false");
  assert.not(list.remove(7), "reject index larger than length with false");
  assert.not(list.remove(0, 0), "reject amount of 0 with false");
  assert.not(list.remove(0, -3), "reject negative amount with false");

  // edge case
  assert.ok(list.remove(0, 1), "don't reject removal of index 0 on empty list");

  // remove item after head
  for (const item of lorem) list.push(item);
  assert.ok(list.remove(1), "remove one item in the list");
  assert.is(list.head, "lorem", "head unchanged");
  assert.is(list.get(1), lorem[2], "removed item at index 1");
  assert.is(
    list.getNode(1).prev,
    list.getNode(0),
    "new item at index 1 points back to head"
  );
  assert.is(
    list.getNode(0).next,
    list.getNode(1),
    "head updated to point to new item at index 1"
  );
  assert.is(list.length, lorem.length - 1, "updated length");

  // remove from start of list
  while (list.length > 0) list.pop(); // empty list first
  for (const item of lorem) list.push(item);
  assert.ok(list.remove(0, 2), "remove two items from start of the list");
  assert.is(list.head, lorem[2], "updated head");
  assert.is(
    list.getNode(0).prev,
    null,
    "head does not point back at removed node"
  );
  assert.is(list.length, lorem.length - 2, "updated length");

  // remove from end of list
  while (list.length > 0) list.pop(); //empty list first
  for (const item of lorem) list.push(item);
  assert.ok(list.remove(4, 10), "remove all element starting with index 4");
  assert.is(list.tail, lorem[3], "updated tail");
  assert.is(
    list.getNode(3).next,
    null,
    "tail does not point forward to removed node"
  );
  assert.is(list.length, 4, "updated length");

  // remove multiple from middle of list
  while (list.length > 0) list.pop(); //empty list first
  for (const item of lorem) list.push(item);
  assert.ok(list.remove(2, 3), "remove items from middle of list");
  assert.is(list.get(0), lorem[0]);
  assert.is(list.get(1), lorem[1]);
  assert.is(list.get(2), lorem[5]);
  assert.is(list.get(3), lorem[6]);
  assert.is(list.length, 4);
});

test.run();
