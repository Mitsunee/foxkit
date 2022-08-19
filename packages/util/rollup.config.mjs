import initConfig from "@foxkit/rollup-config/ts-babel.js";
const makeConfig = initConfig();

const config = [
  makeConfig({ input: "src/clamp/index.ts", key: "./clamp" }),
  makeConfig({ input: "src/dedent/index.ts", key: "./dedent" }),
  makeConfig({ input: "src/object/index.ts", key: "./object" }),
  makeConfig({ input: "src/range/index.ts", key: "./range" }),
  makeConfig({ input: "src/sleep/index.ts", key: "./sleep" }),
  makeConfig({ input: "src/typeOf/index.ts", key: "./typeOf" })
];

export default config;
