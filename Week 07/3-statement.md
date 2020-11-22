### 二、Statement 语句


- Grammar
    - 简单语句
    - 复合语句
    - 声明

- Runtime
    - completion record  完成记录 -> 表达式的返回值
        - [[type]] normal /break/ continue /return /or throw
        - [[value]] 基本类型  如果语句没有，则是 empty
        - [[target]] label|empty 有点像goto语句 定义一个名字跳出多种循环
    - lexical environment  变量作用域？
---
__表达式是有返回值的__
```javascript
let a = 10; // completion record: 10
    
// 定义target label: outter
let num=0;
outter:
for(let i=0;i<10;i++){
    for(let j=0;j<10;j++){
        if(i==5&&j==5){
            break outter;    //退出内部循环，指向outter，即外循环，同时退出外循环
        }
        num++;
    }
}
document.write(num);   //55

// 再看一个例子
function foo(){
  try{
    return 0;
  } catch(err) {

  } finally {
    return 1;
  }
}
foo() // 1

// 通过实际执行，我们看到，finally 中的 return “覆盖”了 try 中的 return。在一个函数中执行了两次 return，这已经超出了很多人的常识，也是其它语言中不会出现的一种行为。 这背后正是completion record: [[type]] return
```

- 简单语句
    - expressionStatement
    - empty--
    - throw--
    - debgger--
    - continue--
    - break--
    - return--

- 复合语句
    - blockStatement   {}
    - ifStatement
    - switch--
    - iteration--
    - with--     // 不建议使用
    - labelled--
    - try--   // try catch finally

再具体展开
- blockStatement
```javascript
{
    // 多几表达式
}
// 其 completion record :
// [[type]]: normal
// [[value]]: --
// [[targe]]: --
```
- iteration 
```javascript
while
do while
for
for in
for of
for await of

```
- tryStatement
// 其 completion record :
// [[type]]: reutrn
// [[value]]: --
// [[targe]]: label

剩下几种为 [[type]]: break continue

#### 扩展下with 关键字

1. 用了解下基本用法：扩展一个语句的作用域链。
```javascript
with(expression) {
    statement
}

// 1.批量给对象赋值
let obj = {};
obj.a = 1;
obj.b = 2;
obj.c = 3;

with (obj) {
    a = 1;
    b = 2;
    c = 3;
}
// 2.直接使用Math对象的方法
var a, x, y;
var r = 10;
with (Math) {
  a = PI * r * r;
  x = r * cos(PI);
  y = r * sin(PI / 2);
}

```
2. 弊端
    - 性能差
    - 语义不明
    - [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/with)

#### declaration 声明
    - funtionDeclaration
    - asyncFnuction
    - generator
    - asyncGenerator
    - variable
    - lexical
    - class

__声明提升!!__

预处理（pre-process）
```javascript
var a = 2;
void function() {
    a = 1;
    return;
    var a
}()
console.log(a) // 2 fun里面声明了一个a， 不会改变外面的a   就算在if里面都会提升
var b = 2;
void function() {
    b = 1;
    return;
    let b;
}()
console.log(b) // 报错
// let const class 在声明前使用都会报错
```

let const就不会声明提升？ 会的
```javascript
var b = 2;
void function() {
    try {
        b = 1;
    } catch(e) {
        console.log(e); //ReferenceError: Cannot access 'b' before initialization
    }
    return;
    let b;
}()
console.log(b) // 2 这个时候没有报错了
```

__作用域__

通过example dscription
```javascript
{
    var a = 2;
    void function() {
        a = 1;
        {
            var a;
            console.log(a); // 1
        }

    }()
    console.log(a); // 2

    // var 的作用域 函数体
}

{
    var b = 2;
    void function() {
        b = 1;
        {
            // const b; const 一定要初始化值的
            let b;
            console.log(b); // undefined
        }

    }()
    console.log(b);   // 1
    // let const 作用域{} blockStatement
}

```