module.exports = {
  rules: {
    "no-unused-vars": ["warn", { varsIgnorePattern: "^_+" }],
    "no-undef": "error",
    "prefer-const": "warn",
    "no-alert": "error",
    "no-else-return": "warn",
    "no-fallthrough": ["error", { commentPattern: "break[\\s\\w]*omitted" }],
    "no-use-before-define": ["error", { variables: true }],
    "prefer-template": "warn"
  }
};
