### 准备目录

```
└── src # ES6源码
    └── index.ts
```

### 安装依赖

```
## 安装 rollup.js 编译 Typescript 代码的插件模块
npm i --save-dev @rollup/plugin-typescript typescript tslib
```

### rollup 配置

1. 配置文件路径 [`../build/rollup.config.js`](../build/rollup.config.js)

```
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
```

### 编译源码

1. 源码内容 `../src/index.js`

```
export default async function (n: number) {
  while (--n) {
    await delay(10, n);
  }
}

function delay(interval: number, num: number) {
  return new Promise((resolve) =>
    setTimeout(() => {
      console.log(num);
      resolve(null);
    }, interval)
  );
}
```

### 编译结果

1. 在项目根目录下执行`npm run dev`
2. 编译结果在`../dist/`目录下
3. 示例源码

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://cdn.bootcdn.net/ajax/libs/babel-polyfill/7.12.1/polyfill.js"></script>
    <script src="./index.js"></script>
  </head>
  <body>
    <script>
      helloworld(8);
    </script>
  </body>
</html>
```
