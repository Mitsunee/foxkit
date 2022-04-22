import initConfig from "@foxkit/rollup-config";
const makeConfig = initConfig();

const config = [
  makeConfig({ input: "src/clamp/index.js", key: "./clamp" }),
  makeConfig({ input: "src/dedent/index.js", key: "./dedent" }),
  makeConfig({ input: "src/range/index.js", key: "./range" }),
  makeConfig({ input: "src/sleep/index.js", key: "./sleep" })
];

export default config;
