const { rules } = require("./rules");

// TODO: typescript

const config = {
  parserOptions: { ecmaVersion: 2021 },
  env: { node: true },
  plugins: [],
  rules,
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
