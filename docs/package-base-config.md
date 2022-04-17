# Package Base config

This configuration can be used to create a new package:

```json
// ./packages/pkg-name-here/package.json
{
  "name": "@foxkit/pkg-name-here",
  "version": "1.0.0",
  "description": "description here",
  "main": "index.js",
  "repository": "Mitsunee/foxkit",
  "author": "Mitsunee",
  "license": "MIT",
  "scripts": {
    "format": "prettier -w .",
    "lint": "eslint .",
    "publish": "clean-publish"
  },
  "eslintConfig": {
    "extends": ["eslint:recommended", "foxkit", "prettier"]
  },
  "nano-staged": {
    "**/*.js": ["eslint", "prettier -w"],
    "**/*.{json,md}": ["prettier -w"]
  },
  "files": ["dist", "index.js"],
  "clean-publish": {
    "withoutPublish": true,
    "tempDir": "../../publish/pkg-name-here",
    "packageManager": "yarn",
    "fields": ["scripts", "packageManager", "nano-staged"]
  },
  "publishConfig": {
    "access": "public"
  },
  "devDependencies": {
    "clean-publish": "^4.0.0",
    "eslint": "^8.12.0",
    "eslint-config-foxkit": "*",
    "eslint-config-prettier": "^8.5.0",
    "nano-staged": "^0.6.0",
    "prettier": "^2.6.2"
  }
}
```

Then run the following commands:

```sh
$ cd packages/pkg-name-here
$ ln -s ../../.prettierrc.json .
$ cd ../..
$ yarn
```

## With TypeScript

- Add the following devDependencies:

```sh
$ yarn workspace @foxkit/pkg-name-here add -D \
  typescript \
  @typescript-eslint/parser \
  @typescript-eslint/eslint-plugin
```

// TODO: add version ranges for TypeScript

- change `"eslintConfig"` key:

```json
{
  "extends": ["eslint:recommended", "foxkit", "foxkit/ts", "prettier"]
}
```

// TODO: scripts with TypeScript typechecks

## With Rollup

- Replace the `"main"` key with `"exports"`.

- Create `rollup.config.mjs` and add it in `package.json` under `"clean-publish".files`

- Follow instructions in the README of [Rollup Config](../packages/rollup-config/README.md).
