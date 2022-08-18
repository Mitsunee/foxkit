import initConfig from "@foxkit/rollup-config/ts-babel.js";
const makeConfig = initConfig();

const config = [
  makeConfig({ input: "src/index.ts", key: "." }),
  makeConfig({ input: "src/stable.ts", key: "./stable" })
];

export default config;
