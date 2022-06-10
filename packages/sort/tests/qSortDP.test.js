import { test } from "uvu";
import { ok, equal } from "uvu/assert";
import { genSubject, toObjectSubject } from "./helpers/genSubject";
import { isReverseSorted, isSorted } from "./helpers/isSorted";
import { qSortDP } from "../src/qSortDP";

test("array shorter than 3", () => {
  equal(qSortDP([]), [], "empty array");
  equal(qSortDP([1]), [1], "length 1");
  equal(qSortDP([1, 2]), [1, 2], "length 2 pre-sorted");
  equal(qSortDP([2, 1]), [1, 2], "length 2 requires sorting");
});

test("basic test", () => {
  const subject = genSubject({ size: 10 });
  const sorted = qSortDP(subject);
  ok(
    isSorted(sorted),
    `Sorted subject ${JSON.stringify(subject)} as ${JSON.stringify(sorted)}`
  );
});

test("reverse sort with callback", () => {
  const subject = genSubject({ size: 10 });
  const sorted = qSortDP(subject, (a, b) => b - a);
  ok(
    isReverseSorted(sorted),
    `Sorted subject ${JSON.stringify(subject)} as ${JSON.stringify(sorted)}`
  );
});

test("sorts objects by specified key", () => {
  const subject = toObjectSubject(genSubject({ size: 10 }));
  const sorted = qSortDP(subject, "val");
  ok(
    isSorted(sorted, "val"),
    `Sorted subject ${JSON.stringify(subject)} as ${JSON.stringify(sorted)}`
  );
});

test("sorts array with duplicates", () => {
  const subject = genSubject({ size: 100, duplicates: true });
  const sorted = qSortDP(subject);
  ok(
    isSorted(sorted),
    `Sorted subject ${JSON.stringify(subject)} as ${JSON.stringify(sorted)}`
  );
});

test("sorts array with skipped values", () => {
  const subject = genSubject({ size: 100, skips: true });
  const sorted = qSortDP(subject);
  ok(
    isSorted(sorted),
    `Sorted subject ${JSON.stringify(subject)} as ${JSON.stringify(sorted)}`
  );
});

test("random tests", () => {
  for (let i = 0; i < 50; i++) {
    let subject = genSubject({
      size: 10 + i * 3,
      skips: i % 3 == 0,
      duplicates: i % 4 == 0
    });
    let sorted;

    if (i == 24 || i == 48 || i % 5 == 0) {
      subject = toObjectSubject(subject);
      sorted = qSortDP(subject, "val");
      ok(
        isSorted(sorted, "val"),
        `Sorted subject ${JSON.stringify(subject)} as ${JSON.stringify(sorted)}`
      );
    } else {
      sorted = qSortDP(subject);
      ok(
        isSorted(sorted),
        `Sorted subject ${JSON.stringify(subject)} as ${JSON.stringify(sorted)}`
      );
    }
  }
});

test.run();
