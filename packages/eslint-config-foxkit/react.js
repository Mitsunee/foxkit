module.exports = {
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
