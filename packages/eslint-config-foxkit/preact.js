const reactConfig = import("./react");

const config = {
  ...reactConfig,
  settings: {
    react: {
      pragma: "h",
      version: "16.0"
    }
  }
};

module.exports = config;
