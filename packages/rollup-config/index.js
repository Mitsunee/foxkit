const { readFileSync, rmdirSync, existsSync } = require("fs");
const { join } = require("path");
const { builtinModules } = require("module");

module.exports = function initConfig({ distPath = "dist" }) {
  // clean dist dir
  const distPathFull = join(process.cwd(), distPath);
  if (existsSync(distPathFull)) {
    rmdirSync(distPathFull, { recursive: true, force: true });
  }

  const pkg = JSON.parse(
    readFileSync(join(process.cwd(), "package.json"), "utf8")
  );

  const external = [
    ...builtinModules,
    //...Object.keys(pkg.dependencies),
    ...Object.keys(pkg.peerDependencies)
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

    return { input, output, external };
  };
};
