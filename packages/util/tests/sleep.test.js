import { test } from "uvu";
import { not } from "uvu/assert";
import { sleep } from "../src/sleep/index.ts";

test("approx. waits for set amount of time", async () => {
  let hasFinished = false;

  setTimeout(() => {
    not(hasFinished);
  }, 80);

  await sleep(100);
  hasFinished = true;
});

test("rejects time of 0", () => {
  not(sleep(0));
});

test("rejects negative time", () => {
  not(sleep(-5));
});

test.run();
