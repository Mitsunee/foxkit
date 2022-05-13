const config = {
  plugins: ["react", "react-hooks", "jsx-a11y"],
  rules: {
    "react/jsx-uses-vars": 1,
    // disable prop types and enforce (j|t)sx file extension
    "react/prop-types": "off",
    "react/jsx-filename-extension": ["error", { extensions: [".jsx", ".tsx"] }],
    // default rules for react-hooks
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    // jsx-a11y rules adapted from eslint-config-next
    "jsx-a11y/alt-text": ["warn", { elements: ["img"] }],
    "jsx-a11y/aria-props": "warn",
    "jsx-a11y/aria-proptypes": "warn",
    "jsx-a11y/aria-unsupported-elements": "warn",
    "jsx-a11y/role-has-required-aria-props": "warn",
    "jsx-a11y/role-supports-aria-props": "warn"
  },
  overrides: [
    {
      files: ["**/*.jsx", "**/*.tsx"],
      env: { browser: true },
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
