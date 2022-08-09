const { readFileSync, rmSync, existsSync } = require("fs");
const { join } = require("path");
const { builtinModules } = require("module");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const { babel } = require("@rollup/plugin-babel");

const extensions = [".js", ".mjs", "cjs", ".ts"];

const plugins = [
  nodeResolve({ extensions }),
  babel({
    extensions,
    babelHelpers: "bundled",
    include: ["src/**/*"]
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

  return function makeConfig({ input, key }) {
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

    const config = { input, output, external, plugins };

    return config;
  };
};
