### 学习笔记
先回顾js的语言结构
- Atom  原子
- Expression 表达式
- Statement 语句
- Structrue 结构
- Module/program 程序

### 一、运算符及表达式

- Grammar  语法
    - grammar tree & priority     语法树与优先级
    - left hand side & right hand side  运算符左值 和 右值

- Runtime  运行时
    - type coversion  类型转换
    - reference  引用类型

#### Reference 引用类型？标准中的类型， 不是js语言的类型
- object
- key ?

#### Expressions
- Member 就一个分析名称  典型代表就是成员访问
    - a.b 成员访问
    - a[b] 成员访问   跟.运算的区别是，b可以用其它类型，.运算只能是字符串
    - foo`string`  把string拆开，当做参数传进foo函数中 - -！以前还不知道有这操作，先走一波demo
    ```javascript
        function foo(s, a , b) {
            console.log(s);
            console.log(a);
            console.log(b);
        }
        let one = 1;
        let two = 2;
        let three = 3;
        foo`a${one}aab${two}aac${three}aab`;
        // 使用花括号把字符串打散成数组，做为参数传function 中
        //["a", "aab", "aac", "aab", raw: Array(4)]   ....s
        // 1   ...........a
        // 2   ...........b

    ```
    - super.a   super 关键字 只在class的 contructor里面使用
    - super[a]
    - new target -> 检测函数或构造方法是否是通过new运算符被调用的 返回一个指向构造方法或函数的引用
    - new Foo()    -> 比new Foo的优先级高
    ```javascript
        new foo()(); // 会先new foo()  再执行其结果
        new new a(); //先执行new a() 再new其结果
    ```
- Call
    - foo()
    - super()
    - foo().a
    - foo()[a]
    - foo()`string`   // example   new a()['b']  会先执行 new a()

- Left Handside & Right Handside
    - 表达式能不能放在等号左手边，不能的话即为right handside
    - example    a.b = c -> √ left hand   a + b = c  ->  x 不是左，就是right handside
- Update (right handside)
    - a++
    - a--
    - --a
    - ++a
    - example 
        - ++ a ++  先跟右面的结合
        - ++ (a ++)
- Unary  一元运算符
    - delete a.b
    - void foo()
    - typeof a
    - +a
    - -a
    - ~a   按位 非
    - !a
    - await a
- exponential  乘方
    - **    example    2 ** 2 ** 3   右结合   相当2 ** （2 ** 3）
- Multiplicative   * / %
- Additive      +  -
- Shift     <<左移 用0填充   >> 右移 用符号位填充   >>> 右移 用0填充  32位
- relationship
    - > <  >=  <=
    - instanceof  in
- Equality  ==  !== === !==
- Bitwise  位运算  & | ^
- Logic  && ||  // 短路原则 
- Conditional  ? : 三目运算   // 短路原则
- 赋值
- yeild
- ...
- ,


(MDN 运算符优先级)[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence]

前置 ++ -- 优先级比后置的低，课程中解析为右手表达式