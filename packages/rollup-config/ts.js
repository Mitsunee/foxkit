const { readFileSync, rmSync, existsSync } = require("fs");
const { join } = require("path");
const { builtinModules } = require("module");
const pluginTypescript = require("rollup-plugin-typescript2");
const typescript = require("typescript");

const plugins = [
  pluginTypescript({
    exclude: "node_modules/**",
    typescript,
    tsconfig: "tsconfig.json",
    useTsconfigDeclarationsDir: true
  })
];

module.exports = function initConfig({ distPath = "dist" } = {}) {
  // clean dist dir
  const distPathFull = join(process.cwd(), distPath);
  if (existsSync(distPathFull) && process.env.ROLLUP_SKIP_CLEAN !== "true") {
    rmSync(distPathFull, { recursive: true, force: true });
  }

  const pkg = JSON.parse(
    readFileSync(join(process.cwd(), "package.json"), "utf8")
  );

  const external = [
    ...builtinModules,
    ...(pkg.dependencies ? Object.keys(pkg.dependencies) : []),
    ...(pkg.peerDependencies ? Object.keys(pkg.peerDependencies) : [])
  ];

  return function makeConfig({ input, key, ts = true }) {
    const output = new Array();

    if (pkg.exports[key].import) {
      output.push({
        file: pkg.exports[key].import,
        format: "esm"
      });
    }

    if (pkg.exports[key].require) {
      output.push({
        file: pkg.exports[key].require,
        format: "cjs"
      });
    }

    const config = { input, output, external };

    if (ts) config.plugins = plugins;

    return config;
  };
};
