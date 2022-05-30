import initConfig from "@foxkit/rollup-config/ts.js";
const makeConfig = initConfig();

const config = [
  makeConfig({ input: "src/index.ts", key: "." }),
  makeConfig({ input: "src/foo.js", key: "./foo", ts: false }) // disable ts for specific export
];

export default config;
