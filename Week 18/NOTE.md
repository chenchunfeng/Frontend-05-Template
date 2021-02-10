
工具链


#### 安装mocha

mocha  https://mochajs.org/

原本是为node设计的，不支持import export  需要用webpack处理

本地安装要配
> "test": "./node_modules/.bin/mocha"
> test文件里面的默认文件是test.js 起其名要叫 指定文件名

#### 引入babel register 处理 import 问题

- [安装 babel/core babel/register](https://www.babeljs.cn/docs/babel-register)
- ./node_modules/.bin/mocha --require @babel/register
- 安装babel/preset-env      .babelrc  {"presets": ["@babel/preset-env"]}

#### 引入nyc 解析覆盖测试问题  code coverage

https://www.npmjs.com/package/nyc

babel会影响nyc处理
要安装插件处理

https://www.npmjs.com/package/babel-plugin-istanbul

- 安装 @istanbuljs/nyc-config-babel  babel-plugin-istanbul
- babelrc 里面添加     "plugins": ["istanbul"]
- nycrc  "extends": "@istanbuljs/nyc-config-babel"

- 最后package.json中添加脚本 coverage: 'nyc mocha'

#### code coverage  html-parse
#### 把测试加入generator-vue中
