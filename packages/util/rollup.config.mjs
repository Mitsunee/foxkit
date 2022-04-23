import initConfig from "@foxkit/rollup-config/ts";
const makeConfig = initConfig();

const config = [
  makeConfig({ input: "src/clamp/index.ts", key: "./clamp" }),
  makeConfig({ input: "src/dedent/index.ts", key: "./dedent" }),
  makeConfig({ input: "src/range/index.ts", key: "./range" }),
  makeConfig({ input: "src/sleep/index.ts", key: "./sleep" })
];

export default config;
