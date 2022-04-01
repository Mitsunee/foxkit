const config = {
  plugins: ["react"],
  rules: {
    "react/prop-types": "off",
    "@next/next/no-img-element": "off",
    "react/jsx-filename-extension": ["error", { extensions: [".jsx", ".tsx"] }]
  },
  overrides: [
    {
      files: ["**/*.jsx", "**/*.tsx"],
      parserOptions: {
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

if (process.env.npm_package_type === "module") {
  config.overrides.push({
    files: ["**/*.jsx"],
    parserOptions: {
      sourceType: "module"
    }
  });
}

module.exports = config;
