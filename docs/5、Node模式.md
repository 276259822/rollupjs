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

const resolveFile = function (filePath) {
  return path.join(__dirname, "..", filePath);
};

module.exports = {
  input: resolveFile("src/index.js"),
  output: {
    file: resolveFile("dist/index.js"),
    format: "umd",
  },
  plugins: [
    babel({
      presets: ["@babel/preset-env"],
    }),
  ],
};
```

2. Node 调用 rollup 编译执行 [`../build/build.js`](../build/build.js)

```
const rollup = require("rollup");
const config = require("./rollup.config");

const inputOptions = config;
const outputOptions = config.output;

async function build() {
  // create a bundle
  const bundle = await rollup.rollup(inputOptions);

  console.log(`[INFO] 开始编译 ${inputOptions.input}`);

  // generate code and a sourcemap
  const { code, map } = await bundle.generate(outputOptions);

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
    "prd": "rollup -c ./build/rollup.config.prod.js",
    "build": "node ./build/build.js"
  }
}
```
