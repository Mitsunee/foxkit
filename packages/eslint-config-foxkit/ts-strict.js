const plugin = require("@typescript-eslint/eslint-plugin");
const ts = require("./ts.js");

const tsOverrides = ts.overrides[0];

module.exports = {
  plugins: ts.plugins,
  overrides: [
    {
      ...tsOverrides,
      rules: {
        ...plugin.configs.recommended.rules,
        "prefer-const": "warn", // warn is good enough
        "@typescript-eslint/ban-ts-comment": "off", // just no, refuse
        "@typescript-eslint/ban-types": "off", // this bans `{}` and says to use `object` instead. `object` incorrectly used Set, Map and such
        "@typescript-eslint/no-explicit-any": "off", // you should be using unknown, but are probably too lazy to refactor.
        "@typescript-eslint/no-non-null-assertion": "off", // is simply needed at times with types from external libs
        "@typescript-eslint/no-unused-vars": [
          "warn",
          { varsIgnorePattern: "^_+" }
        ], // Funfact: the ignore pattern doesn't always work on function params
        ...tsOverrides.rules,
        "@typescript-eslint/no-var-requires": "error",
        "@typescript-eslint/prefer-optional-chain": "warn",
        "@typescript-eslint/consistent-type-exports": [
          "warn",
          { fixMixedExportsWithInlineTypeSpecifier: false }
        ],
        "@typescript-eslint/consistent-type-imports": ["error"],
        "@typescript-eslint/consistent-generic-constructors": "warn",
        "@typescript-eslint/no-misused-promises": "warn",
        "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
        "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "warn",
        "@typescript-eslint/no-unnecessary-boolean-literal-compare": "warn",
        "@typescript-eslint/no-require-imports": "error",
        "dot-notation": "off",
        "@typescript-eslint/dot-notation": "warn",
        "@typescript-eslint/await-thenable": "warn",
        "no-implied-eval": "off",
        "@typescript-eslint/no-implied-eval": "error",
        "@typescript-eslint/restrict-plus-operands": "warn",
        "@typescript-eslint/no-base-to-string": "warn",
        "@typescript-eslint/no-confusing-non-null-assertion": "warn",
        "@typescript-eslint/no-duplicate-enum-values": "warn",
        "@typescript-eslint/no-dynamic-delete": "warn",
        "@typescript-eslint/no-extraneous-class": "warn",
        "@typescript-eslint/no-meaningless-void-operator": "error",
        "@typescript-eslint/no-mixed-enums": "error",
        "no-throw-literal": "off",
        "@typescript-eslint/no-throw-literal": "error",
        //"@typescript-eslint/no-unnecessary-condition": "warn",
        "@typescript-eslint/no-unnecessary-condition": "off", // see https://github.com/typescript-eslint/typescript-eslint/issues/6926
        "@typescript-eslint/no-unsafe-declaration-merging": "error",
        "@typescript-eslint/non-nullable-type-assertion-style": "warn",
        "@typescript-eslint/prefer-function-type": "warn",
        "@typescript-eslint/unified-signatures": "warn"
      }
    }
  ]
};
