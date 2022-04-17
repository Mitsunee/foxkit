import initConfig from "@foxkit/rollup-config";
const makeConfig = initConfig();

const config = [
  makeConfig({ key: "./fetch", input: "./src/fetch/index.js" }),
  makeConfig({ key: "./fs", input: "./src/fs/index.js" }),
  makeConfig({ key: "./fs-yaml", input: "./src/fs-yaml/index.js" }),
  makeConfig({ key: "./log", input: "./src/log/index.js" }),
  makeConfig({ key: "./path", input: "./src/path/index.js" }),
  makeConfig({ key: "./readline", input: "./src/readline/index.js" })
];

export default config;
