const { rules } = require("./rules");

module.exports = {
  parserOptions: {
    sourceType: "module"
  },
  env: {
    node: true,
    browser: true,
    es2020: true
  },
  extends: ["eslint:recommended", "prettier"],
  rules,
  ignorePatterns: [
    "node_modules/**",
    "dist/**",
    ".next/**",
    "out/**",
    "build/**"
  ]
};
