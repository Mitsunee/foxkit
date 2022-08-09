# Foxkit Rollup Config

This package contains utility functions to generate simple Rollup configs

## Installation

```sh
yarn add -D @foxkit/rollup-config rollup
```

## Usage

In your `rollup.config.mjs` file import `initConfig` from the package to create `makeConfig`, then pass it an input path and import key according to your directory structure and exports field:

```js
import initConfig from "@foxkit/rollup-config";
const makeConfig = initConfig();

const config = [
  makeConfig({ input: "src/index.js", key: "." }),
  makeConfig({ input: "src/foo.js", key: "./foo" })
];

export default config;
```

The output paths and dependencies (`external` field in config) will be read from the `package.json` found in the current working directory. Note that each value of `exports` is expected to be an object!

```json
"exports": {
  ".": {
    "import": "./dist/index.js",
    "require": "./dist/index.cjs"
  },
  "./foo": {
    "import": "./dist/foo.js"
  }
}
```

## Skip Autoclean

All configs delete the `dist` directory when initialized. To prevent this behaviour set the environment variable `ROLLUP_SKIP_CLEAN` to `"true"` before initializing a config:

```js
process.env.ROLLUP_SKIP_CLEAN = "true";
const makeConfig = initConfig();
```

```sh
ROLLUP_SKIP_CLEAN="true" yarn build
```

## With TypeScript

Two options exist to use TypeScript:

### With Type Declarations

- Install `typescript rollup-plugin-typeScript2` as well:

```sh
yarn add -D typescript rollup-plugin-typescript2
```

- Then import `"@foxkit/rollup-config/ts"` instead.

```js
import initConfig from "@foxkit/rollup-config/ts.js";
const makeConfig = initConfig();

const config = [
  makeConfig({ input: "src/index.ts", key: "." }),
  makeConfig({ input: "src/foo.js", key: "./foo", ts: false }) // disable ts for specific export
];

export default config;
```

This will make sure types are checked and build time. Type declaration files will be included alongside the generated files.

### Transpiled (Babel)

- Install TypeScript, Babel and `@rollup/plugin-babel` as well:

```sh
yarn add -D typescript @rollup/plugin-babel @babel/core @babel/preset-typescript
```

- Add the following `babel.config.json` config to your project:

```json
{
  "presets": ["@babel/typescript"]
}
```

- Then import `"@foxkit/rollup-config/ts-babel"` instead.

```js
import initConfig from "@foxkit/rollup-config/ts.js";
const makeConfig = initConfig();

const config = [
  makeConfig({ input: "src/index.ts", key: "." }),
  makeConfig({ input: "src/foo.js", key: "./foo" })
];

export default config;
```
