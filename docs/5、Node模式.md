### 准备目录

```
└── build # 编译脚本目录
    └── build.js # 执行编译的Node.js脚本
```

### rollup 配置

1. 基本配置信息 [`../build/rollup.config.js`](../build/rollup.config.js)

```
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
```

2. Node 调用 rollup 编译执行 [`../build/build.js`](../build/build.js)

```
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
```

3. `package.json` 配置编译命令

```
{
  "scripts": {
    "dev": "rollup -c ./build/rollup.config.dev.js",
    "prod": "rollup -c ./build/rollup.config.prod.js",
    "build": "node ./build/build.js"
  }
}
```
