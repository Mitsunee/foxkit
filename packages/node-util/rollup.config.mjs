import initConfig from "@foxkit/rollup-config/ts.js";
const makeConfig = initConfig();

const config = [
  makeConfig({ key: "./fetch", input: "./src/fetch/index.ts" }),
  makeConfig({ key: "./fs", input: "./src/fs/index.ts" }),
  makeConfig({ key: "./fs-yaml", input: "./src/fs-yaml/readFileYaml.ts" }),
  makeConfig({ key: "./log", input: "./src/log/index.ts" }),
  makeConfig({ key: "./path", input: "./src/path/index.ts" }),
  makeConfig({ key: "./readline", input: "./src/readline/readline.ts" })
];

export default config;
