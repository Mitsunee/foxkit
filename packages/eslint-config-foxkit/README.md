# eslint-config-foxkit

Shareable ESLint config

## Installation

Install the following dependencies:

```sh
$ yarn add -D eslint prettier eslint-config-prettier eslint-config-foxkit
```

## Usage

Either in `.eslintrc.cjs` or the `"eslintConfig"` field in `package.json` add:

```json
{
  "extends": ["eslint:recommended", "foxkit", "prettier"]
}
```

This setup enables support for `*.(m|c)js` files and sets the implicit `sourceType` based on the value of `"type"` in your `package.json`. ECMAScript version is set to 2021.

If you already use a different base setup (such as airbnb or Next.js) you can instead import the config using `require()` and add the specific parts you want manually:

```js
const foxkitConfig = require("eslint-config-foxkit");

const config = {
  // your config here
  rules: {
    // your rules here
    // if you have none just set foxkitConfig.rules as value directly as seen above
    ...foxkitConfig.rules
    // your rules here
  },
  overrides: foxkitConfig.overrides // or use spread if you have your own overrides
};

module.exports = config;
```

# Usage with react

Install the following additional dependencies:

```sh
$ yarn add -D react eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y
```

Add `"foxkit/react"` after `"foxkit"` in your config or extend your config manually like:

```js
const foxkitConfigReact = require("eslint-config-foxkit/react");

const config = {
  // your config here
  extends: ["eslint:recommended", "foxkit"],
  rules: {
    // your rules here
    ...foxkitConfigReact.rules
    // your rules here
  }
  overrides: foxkitConfigReact.overrides
};

module.exports = config;
```

`*.tsx` files are accepted by the `jsx-filename-extension` rule by default.

# Usage with typescript

Install the following additional dependencies:

```sh
$ yarn add -D typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

Add `"foxkit/ts"` after `"foxkit"` in your config.

This config uses only the properties `"plugins"` (to ensure `@typescript-eslint` is present) and `"overrides"` to add typescript version of the rules in the base configuration. `*.tsx` files are handled by default.

If you wish to use it without the rules do the following:

```js
const foxkitConfigTS = require("eslint-config-foxkit/ts");

const config = {
  overrides = [
    {
      ...foxkitConfigTS.overrides[0],
      rules: {
        // your typescript-eslint rules here
        // or empty object to remove the foxkit ruleset
      }
    }
  ]
};

module.exports = config;
```
