# foxkit

Foxkit is a collection of utility modules for CJS, ESM and TypeScript projects.

## Install

```shell
npm install foxkit
# or
yarn install foxkit
```

## Usage

### clamp

The `clamp` module provides the functions `clamp()` and `isClamped()`:

```js
import { clamp, isClamped } from "foxkit/clamp";

clamp({ value: 5, min: 0, max: 10 }); // => 5
clamp({ value: -5, min: 0 }); // => 0
clamp({ value: 100, max: 10 }); // => 10

isClamped({ value: 5, min: 0, max: 10 }); // => true
isClamped({ value: -5, min: 0 }); // => false
isClamped({ value: 100, max: 10 }); // => false
```

The `min` and `max` options are optional on both functions to serve as a complete replacement to `Math.min()` and `Math.max()`.

### dedent

`dedent` allows for simple string reformatting with as many indentations removed as possibly and the remainder formatted as per settings.

**Options:**

- tabWidth: The amount of spaces a tab symbol (`\t`) is representing (default: 2)
- useTabs: Transforms as many spaces as possible to tab symbols as per set tabWidth (default: false)
- trim: Remove empty lines at the start and end of the string (default: false)

Passing an objects object is optional, but recommended as defaults may change in future versions.

**Example:**

```js
import { dedent } from "foxkit/dedent";
const dd = dedent({
  tabWidth: 2,
  useTabs: false
});

dd(`
  foo: {
    bar: "baz",
  \tcat: "meows"
  }
`); /* =>
`
foo: {
  bar: "baz",
  cat: "meows"
}
`
*/
```

**Note**: The dedent formatter transforms `\r\n` to `\n` and removes all whitespace in empty lines.

### forEach

The `forEach` module works much like `Array.prototype.forEach`, but also works for Strings and Objects. You may also optionally return `false` from the callback to perform a `break` in the internal `for ()` loop. To `continue` simply `return;`.

```js
import { forEach } from "foxkit/forEach";

const myObj = {
  foo: "foobar",
  lorem: "Lorem ipsum",
  foxkit: "Utility collection",
  unseen: "Can't see me in output :)"
};

forEach(myObj, (value, key) => {
  if (key === "unseen") return false;
  console.log(`${key}: ${value}`);
}); /* =>
foo: foobar
lorem: Lorem ipsum
foxkit: Utility collection
*/
```

### range

The `range` module returns an array with numbers based on the constraints provided in the options. You must provide either an `end` (inclusive) or `length` option. Negative `step` values are supported. Should you provide an invalid combination you may receive an empty array!

```js
import { range } from "foxkit/range";

range({ start: 1, end: 5 }); // => [1, 2, 3, 4, 5]
range({ start: 4, step: 0.5, length: 3 }); // => [4, 4.5, 5]
range({ start: 10, step: -2, end: 5 }); // => [10, 8, 6]
range({ start: 0, end: -5, step: 1 }); // => []
```

### sleep

The `sleep` module returns a Promise that resolves after the given amount of time. It will return `false` should the argument not be a positive number.

```js
await sleep(500); // => Promise<pending> (resolve after 500ms)
await sleep("fox"); // => false
```

## Other Modules

See our [foxkit-js](https://github.com/foxkit-js) github org page or search for "foxkit" on npm.

### See also

- [`modern-diacritics`](https://github.com/Mitsunee/modern-diacritics): library for tranforming diacritics and latinizing text. Also includes a `slugify` function
