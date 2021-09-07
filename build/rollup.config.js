const path = require("path");
const { babel } = require("@rollup/plugin-babel");
const typescript = require("@rollup/plugin-typescript");

const resolveFile = function (filePath) {
  return path.join(__dirname, "..", filePath);
};

module.exports = {
  input: resolveFile("src/index.ts"),
  output: {
    file: resolveFile("dist/index.js"),
    format: "iife",
    name: "helloworld",
  },
  plugins: [
    babel({
      babelHelpers: "bundled",
      presets: ["@babel/preset-env"],
    }),
    typescript({ lib: ["es5", "es6", "dom"], target: "es5" }),
  ],
};
