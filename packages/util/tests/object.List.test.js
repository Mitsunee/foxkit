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

test("Can convert List to Array", () => {
  const list = new List();

  assert.equal(list.toArray(), [], "return empty array for empty list");

  for (const item of lorem) list.push(item);
  assert.equal(list.toArray(), lorem, "return equal array to input");
});

test("Can create List from Array", () => {
  const list = List.fromArray(lorem);

  for (let i = 0; i < lorem.length; i++) {
    assert.is(list.get(i), lorem[i], "created list is equal to input array");
  }
});

test("Can insert Array", () => {
  const list = new List();
  assert.not(list.insertArray(-7, lorem), "reject negative index with false");

  // can insert at the end of the list
  list.push("first").push("second");
  assert.ok(list.insertArray(2, lorem), "inserted array at end of list");
  let expected = ["first", "second", ...lorem];
  for (let i = 0; i < expected.length; i++) {
    assert.is(
      list.get(i),
      expected[i],
      `inserted array at end of list (index: ${i})`
    );
  }
  assert.is(list.length, expected.length, "updated length after insertion");
  assert.is(list.tail, expected[expected.length - 1], "updated tail correctly");

  // can insert at the start of the list
  while (list.length > 0) list.pop(); //empty list first
  list.push("second-to-last").push("last");
  assert.ok(list.insertArray(0, lorem), "inserted array at start of list");
  expected = [...lorem, "second-to-last", "last"];
  for (let i = 0; i < expected.length; i++) {
    assert.is(
      list.get(i),
      expected[i],
      `inserted array at start of list (index: ${i})`
    );
  }
  assert.is(list.length, expected.length, "updated length after insertion");
  assert.is(list.head, expected[0], "updated head correctly");

  // can insert in the middle of the list
  while (list.length > 0) list.pop(); //empty list first
  list.push("first").push("second").push("second-to-last").push("last");
  assert.ok(list.insertArray(2, lorem), "inserted array in middle of list");
  expected = ["first", "second", ...lorem, "second-to-last", "last"];
  for (let i = 0; i < expected.length; i++) {
    assert.is(
      list.get(i),
      expected[i],
      `inserted array in middle of list (index: ${i})`
    );
  }
  assert.is(list.length, expected.length, "updated length after insertion");

  assert.not(
    list.insert(list.length + 1, lorem),
    "reject index larger than length with false"
  );
});

test("Can determine if a value is a List", () => {
  assert.ok(List.isList(new List()), "returns true for new List");
  assert.not(List.isList(null));
  assert.not(List.isList(new Array()));
});

test("Can clone list", () => {
  const list = List.fromArray(lorem);
  const clone = list.clone();

  assert.equal(clone.toArray(), list.toArray(), "lists are equal");
  assert.equal(clone.length, list.length, "lists have the same length");

  // modify original
  list.push("foobar");
  assert.is(list.length, clone.length + 1, "clone did not get larger");
  assert.not(clone.tail === list.tail, "clone did not change");
  list.pop();

  // modify clone
  clone.push("foobar");
  assert.is(clone.length, list.length + 1, "original did not get larger");
  assert.not(list.tail === clone.tail, "original did not change");
});

test("Can concat list", () => {
  const list = new List();
  list.push("first");
  const expected = ["first", ...lorem];

  // with Array
  let output = list.concat(lorem);
  for (let i = 0; i < expected.length; i++) {
    assert.is(
      output.get(i),
      expected[i],
      `inserted array at end of list (index: ${i})`
    );
  }
  assert.is(output.length, expected.length, "updated length after insertion");

  // with List
  output = list.concat(List.fromArray(lorem));
  for (let i = 0; i < expected.length; i++) {
    assert.is(
      output.get(i),
      expected[i],
      `inserted list at end of list (index: ${i})`
    );
  }
  assert.is(output.length, expected.length, "updated length after insertion");
});

test("Can check if every element matches condition", () => {
  const list = List.fromArray(lorem);

  assert.ok(list.every(value => typeof value == "string"));
  assert.not(list.every(value => value.length <= 5));
});

test("Can check if any element matches condition", () => {
  const list = List.fromArray(lorem);

  assert.ok(list.some(value => value.endsWith("sum"))); // ipsum should match
  assert.not(list.some(value => value.length > 50));
});

test("Can filter List", () => {
  const list = List.fromArray(lorem);
  const test = value => value.length < 5;
  const output = list.filter(test);
  assert.equal(output.toArray(), lorem.filter(test));
});

test("Can find value/index by condition/value", () => {
  const list = List.fromArray(lorem);
  const test = value => value.endsWith("sum");

  // found an element
  assert.is(list.find(test), lorem.find(test));
  assert.is(list.findIndex(test), lorem.findIndex(test));
  assert.ok(list.includes("ipsum"));
  assert.is(list.indexOf("ipsum"), 1);

  // found none
  const badTest = value => value.length > 50;
  assert.is(list.find(badTest), undefined);
  assert.is(list.findIndex(badTest), -1);
  assert.not(list.includes("foobarbazbonk"));
  assert.is(list.indexOf("foobarbazbonk"), -1);
});

test("Can run callback on every element", () => {
  const list = List.fromArray(lorem);

  let sum = 0;
  list.forEach(value => {
    sum += value.length;
  });

  assert.is(
    sum,
    lorem.reduce((s, val) => s + val.length, 0)
  );
});

test("Can map List", () => {
  const list = List.fromArray(lorem);
  const cb = value => value.length;
  assert.equal(list.map(cb)?.toArray(), lorem.map(cb));
});

test("Can reduce List", () => {
  const list = List.fromArray(lorem);
  const reducer = (a, v) => a + v.length;
  assert.is(list.reduce(reducer, 0), lorem.reduce(reducer, 0));
});

test("Can reverse List", () => {
  const list = List.fromArray(lorem).reverse();
  assert.equal(list.toArray(), [...lorem].reverse());
});

test("Can get slice of List", () => {
  const list = List.fromArray(lorem);

  assert.equal(
    list.slice(2).toArray(),
    lorem.slice(2),
    "positive start, no end"
  );
  assert.equal(
    list.slice(2, 6).toArray(),
    lorem.slice(2, 6),
    "positive start and end"
  );
  assert.equal(
    list.slice(1, -4).toArray(),
    lorem.slice(1, -4),
    "positive start, negative end"
  );
  assert.equal(
    list.slice(-3).toArray(),
    lorem.slice(-3),
    "negative start, no end"
  );
  assert.equal(
    list.slice(-3, 5).toArray(),
    lorem.slice(-3, 5),
    "negative start, positive end"
  );
  assert.equal(
    list.slice(-5, -2).toArray(),
    lorem.slice(-5, -2),
    "negative start, negative end"
  );
  assert.equal(list.slice(4, 2).toArray(), [], "empty for impossible slice");
});

test("Can sort list", () => {
  const list = List.fromArray(lorem);

  // with no callback
  let output = list.sort();
  assert.equal(output.toArray(), [...lorem].sort());

  // with callback
  const cb = (a, b) => a.length - b.length;
  output = list.sort(cb);
  assert.equal(output.toArray(), [...lorem].sort(cb));
});

test("Can join list", () => {
  const list = new List();

  assert.is(list.join(","), "", "return empty string for empty list");
  list.push("first");
  assert.is(list.join(","), "first", "return only head with no trailing comma");
  list.pop();
  list.insertArray(0, lorem);
  assert.is(list.join(), lorem.join(), "join list with default separator");
  assert.is(
    list.join("! "),
    lorem.join("! "),
    "join list with custom separator"
  );
  assert.is(list.toString(), lorem.toString(), "use toString method");
});

test.run();
