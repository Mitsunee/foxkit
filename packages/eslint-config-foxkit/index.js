const config = {
  parserOptions: { ecmaVersion: 2021 },
  env: { node: true },
  rules: {
    "no-unused-vars": ["warn", { varsIgnorePattern: "^_+" }],
    "no-undef": "error",
    "prefer-const": "warn",
    "no-alert": "error",
    "no-else-return": "warn",
    "no-fallthrough": ["error", { commentPattern: "break[\\s\\w]*omitted" }],
    "no-use-before-define": ["error", { variables: true }],
    "prefer-template": "warn"
  },
  overrides: [
    {
      files: ["**/*.cjs"],
      parserOptions: { sourceType: "script" }
    },
    {
      files: ["**/*.mjs"],
      parserOptions: { sourceType: "module" }
    }
  ],
  ignorePatterns: ["dist/**", ".next/**", "node_modules/**", ".git/**"]
};

if (process.env.npm_package_type === "module") {
  config.parserOptions.sourceType = "module";
}

module.exports = config;
