var Generator = require('yeoman-generator');


module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
      // Calling the super constructor is important so our generator is correctly set up
      super(args, opts);
  
      // Next, add your custom code
      // this.option('babel'); // This method adds support for a `--babel` flag
    }
    async method1() {
      const answers = await this.prompt([
        {
          type: "input",
          name: "name",
          message: "Your project name",
          default: this.appname // Default to current folder name
        },
        {
          type: "confirm",
          name: "cool",
          message: "Would you like to enable the Cool feature?"
        }
      ]);
  
      this.log("app name", answers.name);
      this.log("cool feature", answers.cool);
  
    }

    method2() {
        this.log('method 2 just ran');
    }
    initPackage() {
      const pkgJson = {
        devDependencies: {
          eslint: '^3.15.0'
        },
        dependencies: {
          react: '^16.2.0'
        }
      };
  
      // 判断是否存在，不存在则新增
      this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
      // 安装包，可以指定参数
      this.npmInstall();

    }
    writing() {
      this.fs.copyTpl(
        this.templatePath('index.html'),
        this.destinationPath('public/index.html'),
        { title: 'Templating with Yeoman' }
      );
    }
  };