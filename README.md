### rollupjs

[《rollup.js 官方中文文档》](https://rollupjs.org/guide/zh/)

### 概述

#### Rollup 是一个 JavaScript 模块打包器，可以将小块代码编译成大块复杂的代码，例如 library 或应用程序。Rollup 对代码模块使用新的标准化格式，这些标准都包含在 JavaScript 的 ES6 版本中，而不是以前的特殊解决方案，如 CommonJS 和 AMD。ES6 模块可以使你自由、无缝地使用你最喜爱的 library 中那些最有用独立函数，而你的项目不必携带其他未使用的代码。ES6 模块最终还是要由浏览器原生实现，但当前 Rollup 可以使你提前体验。

### 生成格式

- amd – 异步模块定义，用于像 RequireJS 这样的模块加载器
- cjs – CommonJS，适用于 Node 和 Browserify/Webpack
- esm – 将软件包保存为 ES 模块文件，在现代浏览器中可以通过`<script type=module>`标签引入
- iife – 一个自动执行的功能，适合作为`<script>`标签。（如果要为应用程序创建一个捆绑包，您可能想要使用它，因为它会使文件大小变小。）
- umd – 通用模块定义，以 amd，cjs 和 iife 为一体
- system - SystemJS 加载器格式

### 实战目录

- [1、快速开始](./docs/1、快速开始.md)
- [2、ES6 编译](./docs/2、ES6编译.md)
- [3、开发模式](./docs/3、开发模式.md)
- [4、生产模式](./docs/4、生产模式.md)
- [5、Node 模式](./docs/5、Node模式.md)
