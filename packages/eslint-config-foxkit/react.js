const { rules } = require("./rules/react");

const config = {
  plugins: ["react"],
  rules,
  overrides: [
    {
      files: ["**/*.jsx", "**/*.tsx"],
      parserOptions: {
        sourceType: "module",
        ecmaFeatures: { jsx: true }
      }
    }
  ],
  settings: {
    react: {
      version: "detect"
    }
  }
};

module.exports = config;
