import { test } from "uvu";
import { is } from "uvu/assert";
import { dedent } from "../src/dedent/index.js";

test("dedents with default options", () => {
  const dd = dedent();
  is(dd(`    test`), "test", "single-line test with spaces");
  is(dd(`\ttest`), "test", "single-line test with tab");
  is(
    dd(`
        test
          test
        \ttest
      `),
    `\ntest\n  test\n  test\n`,
    "multi-line test"
  );
});

test("clears empty lines", () => {
  is(
    dedent()(`
        test
        \t\t\t
        test2
      `),
    `\ntest\n\ntest2\n`
  );
});

test("transforms CRLF to LF", () => {
  is(dedent()(`\r\ntest\r\n\r\ntest2\r\n`), `\ntest\n\ntest2\n`);
});

test("can transform to tabs", () => {
  const dd = dedent({ useTabs: true });
  is(
    dd(`
        test
          test
        \ttest
      `),
    `\ntest\n\ttest\n\ttest\n`,
    "test with only indents divisible by tabWidth"
  );
  is(
    dd(`
        test
           3spaces
        \t\t2tabs
      `),
    `\ntest\n\t 3spaces\n\t\t2tabs\n`,
    "test with extra spaces incompatible with tabWidth"
  );
});

test("can use custom tabWidths", () => {
  const dd = dedent({ tabWidth: 4 });
  is(
    dd(`
        0
          2
        \t4
      `),
    `\n0\n  2\n    4\n`
  );
});

test("can transform to tabs of custom width", () => {
  const dd = dedent({ useTabs: true, tabWidth: 4 });
  is(
    dd(`
        lorem ipsum
            dolor sit
        amet
      `),
    `\nlorem ipsum\n\tdolor sit\namet\n`
  );
});

test("can trim empty lines at the start and end", () => {
  const dd = dedent({ trim: true });
  is(
    dd(`
        test
      `),
    "test"
  );
});

test.run();
