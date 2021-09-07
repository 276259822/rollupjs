const path = require("path");
const { babel } = require("@rollup/plugin-babel");
const typescript = require("@rollup/plugin-typescript");
const pkg = require("../package.json");

const resolveFile = function (filePath) {
  return path.join(__dirname, "..", filePath);
};

const banner =
  "/*!\n" +
  ` * rollup.js v${pkg.version}\n` +
  ` * (c) 2021-${new Date().getFullYear()} \n` +
  " * Released under the MIT License.\n" +
  " */";

module.exports = {
  input: resolveFile("src/index.ts"),
  output: {
    file: resolveFile("dist/index.js"),
    format: "iife",
    name: "helloworld",
    banner,
  },
  plugins: [
    babel({
      babelHelpers: "bundled",
      presets: ["@babel/preset-env"],
    }),
    typescript({ lib: ["es5", "es6", "dom"], target: "es5" }),
  ],
};
