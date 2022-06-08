# Package Base config

- This `package.json` template is used to create a new package. Replace every instance of `pkg-name-here` with the package name. Create the file in `./packages/pkg-name-here/package.json`

```json
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
    "test": "echo Package has no tests",
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

- Then run the following commands to symlink the prettier configuration:

```sh
$ cd packages/pkg-name-here
$ ln -s ../../.prettierrc.json .
$ cd ../..
$ yarn
```

## With Tests (uvu)

- Add the following devDependencies:

```sh
$ yarn workspace @foxkit/pkg-name-here add -D uvu
```

- Change the following scripts:

```json
  "test": "uvu",
  "prepublish": "eslint . && yarn test",
```

- Create the tests directory and add it to the `"clean-publish".files` list:

```sh
$ mkdir packages/pkg-name-here/tests
```

## With TypeScript

- Add the following devDependencies and symlink the typescript configuration:

```sh
$ yarn workspace @foxkit/pkg-name-here add -D \
  typescript \
  @typescript-eslint/parser \
  @typescript-eslint/eslint-plugin
$ cd packages/pkg-name-here
$ ln -s ../../tsconfig.json .
$ cd ../..
```

- Change the following scripts:

```json
  "test": "tsc --noEmit",
  "prepublish": "eslint . && yarn test",
```

If you already added `uvu` earlier change test script like this instead and install the devDepency `tsm`:

```json
  "test": "tsc --noEmit && uvu -r tsm",
```

```sh
yarn workspace @foxkit/pkg-name-here add -D tsm
```

- Change `"eslintConfig"` key:

```json
{
  "extends": ["eslint:recommended", "foxkit", "foxkit/ts", "prettier"]
}
```

- Change `"nano-staged"` to lint and format `*.ts` files:

```json
  "nano-staged": {
    "**/*.{js,ts}": [
      "eslint",
      "prettier -w"
    ],
    "**/*.{json,md}": [
      "prettier -w"
    ]
  }
```

- Add `"tsconfig.json` to the `"clean-publish".files` list

- Follow the instructions below to add Rollup as a compile step

## With Rollup

- Add the following devDependencies:

```sh
$ yarn workspace @foxkit/pkg-name-here add -D @foxkit/rollup-config@* rollup
```

- Replace the `"main"` key with `"exports"`.
- Rename the `"prepublish"` script to `"prebuild"` and add the following scripts below it:

```json
  "build": "rollup -c",
  "dev": "rollup -c -w",
  "publish": "yarn build && clean-publish"
```

- Create `rollup.config.mjs` and add it to the `"clean-publish".files` list
- Follow instructions in the README of [Rollup Config](../packages/rollup-config/README.md).
