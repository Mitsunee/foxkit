const config = {
  plugins: ["no-await-in-promise"],
  parserOptions: { ecmaVersion: 2021 },
  env: { node: true, es2021: true },
  rules: {
    "no-unused-vars": ["warn", { varsIgnorePattern: "^_+" }],
    "no-undef": "error",
    "prefer-const": "warn",
    "no-alert": "error",
    "no-else-return": "warn",
    "no-fallthrough": ["error", { commentPattern: "break[\\s\\w]*omitted" }],
    "no-use-before-define": ["error", { variables: true }],
    "prefer-template": "warn",
    "no-return-await": "warn",
    "operator-assignment": ["warn", "always"],
    "logical-assignment-operators":
      parseInt(process.versions.node) <= 14
        ? ["error", "never"]
        : ["warn", "always", { enforceForIfStatements: true }],
    "no-await-in-promise/no-await-in-promise": "warn"
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
