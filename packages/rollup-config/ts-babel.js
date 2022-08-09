const { readFileSync, rmSync, existsSync } = require("fs");
const { join } = require("path");
const { builtinModules } = require("module");
const babel = require("@rollup/plugin-babel");

const plugins = [
  babel({
    extensions: [".js", ".mjs", "cjs", ".ts"],
    babelHelpers: "bundled",
    include: ["src/**/*"]
  })
];

module.exports = function initConfig({ distPath = "dist" } = {}) {
  // clean dist dir
  const distPathFull = join(process.cwd(), distPath);
  if (existsSync(distPathFull)) {
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
