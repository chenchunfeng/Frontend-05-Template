### week 6

---
### 一、语言按语法分类

1. 非形式语言

日常所说的英文 中文，没有固定语法  比如 long time no see 也是能理解的。

2. 形式语言

大部分计算机里面的都是形式语言，有严格的语法

按“乔姆斯基谱系”分类

- 0 无限制文法
- 1 上下文相关文法
- 2 上下文无关文法
- 3 正则文法  regular


0123是包含关系

---
### 二、产生式（BNF）

- 语法结构名： 用尖括号括起来的名称
- 语法结构分两种
> * 基础结构（终结符  terminal symbol）
> * 复合结构 （非终结符） 需要其它语法结构来定义

### 这里的终结不是程序终结的意思, 类似树节点的意思 ###

- 终结符： 使用字符串表示 就引号加其中的字符
- |   表示或的关系
- \*  表示重复多次
- \+  至少一次
- ::= 是“被定义为”的意思，老师没提到的！

### demo： （a|b）+ 意思就是说 a或b至少出现一次 ### 

第三周懵逼的东西又回来了，让我们回顾下

四则运算，被处理成token -> 乘法表达式 -> 加法表达式 -> 最后拿到表达式

- 乘法表达式 -- 单独的数字 或 乘法表达式 * 数字 或 乘法表达式 / 数字
```
<multiplicativeExpreesion> ::= <number> | <multiplicativeExpreesion> "*" <number> |  <multiplicativeExpreesion> "/" <number>
```

- 加法表达式 -- 单独乘法表达式 或 加法表达式 + 乘法表达式 或 加法表达式 - 乘法表达式
```
<additiveExpresstion> ::= <multiplicativeExpreesion> | <additiveExpresstion> "+" <multiplicativeExpreesion> | <additiveExpresstion> "-" <multiplicativeExpreesion> | 
```
- 最终 表达式  加法表达式加 EOF(end of file)
```
<expression> ::= <additiveExpresstion><EOF>
```
### 1 + 2 * 3  伪代码 ###
```
expression
    |   additiveExpresstion
    |   |   multiplicativeExpreesion
    |   |   |   match number.......... 1
    |   |   _
    |   |   match '+'
    |   |   multiplicativeExpreesion
    |   |   |   match number.......... 2
    |   |   |   match '*'
    |   |   |   match number ......... 3
    |   |   _
    |   |   oprate ................... * // 2 3 * 相当于 2 * 3
    |   oprate ....................... + // 1 (2 3 *) + 相当于 1 +（2 * 3）
    EOF

```
### 作业：（）圆括号分组产生式 parenthese ###
左括号 和 右括号 之间的token 嵌套新的表达式 ? 新的产生式？
```
Exp -> AddExp  // Expression 下面只有一种可能性，就是AddExp
AddExp -> AddExp opt1 MulExp | MulExp // addExp 下面有两种可能性： 乘法表达式 或（加法表达式 操作符 乘法表达式）
opt1 -> + | -  // 加法操作符
MulExp -> MulExp opt2 AtomicExp | AtomicExp  // ！！！这里不再是数字终止符， 嵌套表达，也可以理解为原子表达式
opt2 -> * | /   // 乘法操作符
AtomicExp -> "(" Exp ")" | number  // 原子表达式 可能是数字 可 一个 被圆括号 包起来的表达式
```
通过上面的规则，尝试图解(1 + 2) * 3
```
Exp
|   AddExp
|   |   MulExp
|   |   |   AtomicExp
|   |   |   | match "("  --------- 发现左括号
|   |   |   | Exp        --------- 递归嵌套
|   |   |   |   AddExp
|   |   |   |   |   MulExp
|   |   |   |   |   |   AtomicExp
|   |   |   |   |   |   |   match number.......... 1
|   |   |   |   |   |   _   
|   |   |   |   |   _
|   |   |   |   |   match "+"
|   |   |   |   |   MulExp
|   |   |   |   |   |   AtomicExp
|   |   |   |   |   |   |   match number.......... 2
|   |   |   |   |   |   _   
|   |   |   |   |   _
|   |   |   |   _
|   |   |   |   oprate ........................... +  
|   |   |   | match ")"   ----- 发现右括号
|   |   |   _
|   |   MulExp
|   |   |   match '*'
|   |   |   AtomicExp
|   |   |   |   match number ....................... 3
|   |   |   _
|   |   _
|   |   oprate ..................................... *
|   _
EOF

```
<img src="./img/atomicExp.jpg" style="width:500px;height:300px">

### 三、通过产生式理解乔姆期基普系


