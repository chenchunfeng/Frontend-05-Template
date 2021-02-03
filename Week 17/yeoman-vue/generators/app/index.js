var Generator = require('yeoman-generator');


module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
  }

  async initPackage() {
    const answers = await this.prompt([{
      type: "input",
      name: "name",
      message: "Your project name",
      default: this.appname
    }]);
    const pkgJson = {
      "name": answers.appname,
      "version": "1.0.0",
      "main": "generators/app/index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC",
      "description": "",
      "dependencies": {}
    };

    // 判断是否存在，不存在则新增
    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
    // 安装包，可以指定参数
    this.npmInstall(['vue'], {
      'save-dev': false
    });
    this.npmInstall([
      'webpack',
      'webpack-cli',
      'vue-loader',
      'vue-template-compiler',
      'css-loader',
      'vue-style-loader',
      'copy-webpack-plugin'
    ], {
      'save-dev': true
    });

    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('src/index.html'), {
        title: answers.name
      },
    );
    this.fs.copyTpl(
      this.templatePath('main.js'),
      this.destinationPath('src/main.js'),
    );
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'),
    );
    this.fs.copyTpl(
      this.templatePath('Hello.vue'),
      this.destinationPath('src/Hello.vue'),
    );
    this.fs.copyTpl(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore'),
    );

  }
};