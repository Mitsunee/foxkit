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
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": rules["no-unused-vars"],
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define":
          rules["no-use-before-define"],
        "@typescript-eslint/no-require-imports": "error"
      }
    }
  ]
};
