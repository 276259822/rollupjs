const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const rollup = require("rollup");
const config = require("./rollup.config");
const terser = require("terser");

const inputOptions = config;
const outputOptions = config.output;

function getSize(code) {
  return (code.length / 1024).toFixed(2) + "kb";
}

function blue(str) {
  return "\x1b[1m\x1b[34m" + str + "\x1b[39m\x1b[22m";
}

function write(dest, code, zip) {
  return new Promise((resolve, reject) => {
    function report(extra) {
      console.log(
        blue(path.relative(process.cwd(), dest)) +
          " " +
          getSize(code) +
          (extra || "")
      );
      resolve();
    }

    fs.writeFile(dest, code, (err) => {
      if (err) return reject(err);
      if (zip) {
        zlib.gzip(code, (err, zipped) => {
          if (err) return reject(err);
          report(" (gzipped: " + getSize(zipped) + ")");
        });
      } else {
        report();
      }
    });
  });
}

async function build() {
  // create a bundle
  const bundle = await rollup.rollup(inputOptions);

  console.log(`[INFO] 开始编译 ${inputOptions.input}`);

  // generate code and a sourcemap
  await bundle.generate(outputOptions).then(({ output: [{ code }] }) => {
    const minified =
      (outputOptions.banner ? outputOptions.banner + "\n" : "") +
      terser.minify(code, {
        toplevel: true,
        output: {
          ascii_only: true,
        },
        compress: {
          pure_funcs: ["makeMap"],
        },
      }).code;
    return write(outputOptions.file, minified, true);
  });

  console.log(`[SUCCESS] 编译结束 ${outputOptions.file}`);

  // or write the bundle to disk
  await bundle.write(outputOptions);
}

build();
