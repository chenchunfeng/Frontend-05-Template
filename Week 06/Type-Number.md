### 七、重头戏开始 ----> Number

1. javascript 最小单元？

- grammar 语法
    - whitespace
    - line terminal
    - litaral
    - variable
    - keywords

- runtime
    - types 七种类型
    - execution content 上下文


types 七种类型

- string
- number
- boolean
- undefined
- null   typeof null -> object
- object
- symbol 

2. IEE 754 Double Float   双精度浮点数（64位） 指数位确定浮点数的取值范围，尾数位确定浮点数的精度。

    - sign（1）  符号位  -> 0表示正，用1表示负
    - exponent（11）  指数位（要表示正负的情况，引移码的概念）
        - 一个1后面十个0 做为基准 比这个大的为正 比这个小的为负
        - 基准值 - 1

    - fraction（52）  尾数位  隐藏位 1
        - f = 0/2^1 + 0/2^2 + 0/2^3 +  ... + 0/2^52
表达式：
> n = (-1)^s * 2^(e-127) * (1 + f) 单精度 
- 指数位8位 于是基准为10000000 转十进 128 - 1 = 127
- 精度 23位

> n = (-1)^s * 2^(e-1023) * (1 + f)
- 指数位11位 于是基准为10000000000 转十进 1024 - 1 = 1023
- 精度 52位



(右边为第0位)
- 单精度 
    - s : 第31位
    - e : 第30至23位
    - f : 第22指0位

- 双精度 
    - s : 第63位
    - e : 第62至52位
    - f : 第51指0位

举个单精度例子
| s | e | f |
| :-: | :-: | :-: |
| 0 | 0111 1110 | 1100 0000 0000 0000 0000 000 |

- s = 0 为正数
- e转为十进制是126
- f = 1 / 2^1 + 1 / 2^2 = 0.75;

> n = (-1)^0 * 2^(126-127) * (1+0.75) = 0.875;

十进制小数转单精度
- 23.56 -> 10111.1000111101011100001
- 将小数点移到前面只有一位数字 1.01111000111101011100001 这里移了四位
- 01111000111101011100001填入22-0位----- f
- 因为是正数，第31位为0  ----------------- s
- 左移了4位 (e-127) = 4,e=131，转为二进制所以第30至23位为1000 0011 -------------- e

### 重头戏 0.1 + 0.2 ！= 0.3 问题###

根本是三次转换跟一次运算精度损失造成的

> 精度要求不高 
```
(0.1 + 0.2).toFixed(2) // 0.30
```
> 精度要求高 es6  Number.EPSILON “机器精度”（machine epsilon 对JavaScript的数字来说，这个值通常是 2^-52 
```javascript
  if (!Number.EPSILON) {
    Number.EPSILON = Math.pow(2,-52);
  }
 function numbersCloseEnoughToEqual(n1,n2) {
    return Math.abs( n1 - n2 ) < Number.EPSILON;
  }

  var a = 0.1 + 0.2;
  var b = 0.3;

  numbersCloseEnoughToEqual( a, b ); // true
  numbersCloseEnoughToEqual( 0.0000001, 0.0000002 ); // false
```

各种进制的表示法

- 十进制 decimal literal
    - 0.
    - .0
    - 1e3
    - 1.2
    - 特殊例子 0 .toString(); 跟0. 语法冲突

- 二进制整数 binary integer    0b开头
- 八进制整数  octal integer    0o开头
- 十六进制整数 hex integer    0x开头
