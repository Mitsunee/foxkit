const { rules } = require("./index.js");

module.exports = {
  plugins: ["@typescript-eslint"],
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        sourceType: "module",
        warnOnUnsupportedTypeScriptVersion: true
      },
      rules: {
        "no-unused-vars": "off", // use TS version instead
        "@typescript-eslint/no-unused-vars": rules["no-unused-vars"],
        "no-use-before-define": "off", // use TS version instead
        "@typescript-eslint/no-use-before-define":
          rules["no-use-before-define"],
        "@typescript-eslint/no-require-imports": "error",
        "no-undef": "off", // already taken care of by ts
        "no-redeclare": "off" // prevents overloading functions
      }
    }
  ]
};
