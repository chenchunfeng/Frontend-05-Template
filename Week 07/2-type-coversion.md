### 二、类型转换 type conversion


example
```javascript
'false' == false // false
'a' + 1  // a1 1被转字符串
'a' + true // ature  ture 被转字符串
1 + true // 2  ture被转成1
1 + false // 1  false被转成0
```
||Number|String|Boolean|Undefined|Null|Object|Symbol|
|--|--|--|--|--|--|--|--|
|Number|-||0 false|x|x|boxing|x|
|String||-|'' false|x|x|boxing|x|
|Boolean|true 1 /false 0|'true' 'false'|-|x|x|boxing|x|
|Undefined|NaN|'Undefined'|false|-|x|x|x|
|Null|0|'null'|false|x|-|x|x|
|Object|valueOf|valueOf toStirng|true|x|x|-|x|
|Symbol|x|x|x|x|x|boxing|-|

---
- Unboxing 对象拆箱  -> 对象转基本类型
    - toPrimitive
    - toString vs valueOf
    - symbol.toPremitive

当对象发生到基本类型值的转换时，会按照下面的逻辑调用对象上的方法：


1. 检查对象中是否有用户显式定义的 [Symbol.toPrimitive] 方法，如果有，直接调用；
```javascript
// example
let o = {
    toString() {
        console.log('toString');
        return '1';
    },
    valueOf() {
        console.log('valueOf');
        return 2;
    },
    [Symbol.toPrimitive]() {
        console.log('symbol.toPrimitive');
        return 3;
    }
}
o + 1 // 4
o + '1' // 31
let x = {};
x[o]=1;    // x {3: 1}

// 存在 [Symbol.toPrimitive]都会直接调用
```
2. 如果没有，则执行原内部函数 ToPrimitive，然后判断传入的 hint 值，如果其值为 string，顺序调用对象的 toString 和 valueOf 方法（其中 toString 方法一定会执行，如果其返回一个基本类型值，则返回、终止运算，否则继续调用 valueOf 方法
```javascript
// 怎样看hint
let o = {
    [Symbol.toPrimitive](hint) {
        console.log('symbol.toPrimitive:' + hint);
        return 3;
    }
}
o + 1 // 4 hint: default
o + '1' // hint: default
let x = {};
x[o]=1;    // hint: string
alert(o)    // hint: string
+o;        // hint: number

let two = {
    toString() {
        console.log('toString');
        return {};
        
        
    },
    valueOf() {
        console.log('valueOf');
        return 2
        
    }
}
alert(two) // hint string  toString valueOf   2
```
3. 如果判断传入的 hint 值不为 string，则就可能为 number 或者 default 了，均会顺序调用对象的 valueOf 和 toString 方法（其中 valueOf 方法一定会执行，如果其返回一个基本类型值，则返回、终止运算，否则继续调用 toString 方法）；

```javascript
let three = {
    toString() {
        console.log('toString');
        return '3';
    },
    valueOf() {
        console.log('valueOf');
        return {};
        
    }
}
+three // hint: number valueOf toStirng 3
three + 1 // hint: default valueOf toStirng '31'
three + '1'  // hint: default valueOf toStirng '31'
```

- boxing   基本类型转对象

|类型|对象|值
|--|--|--|
|Number|new Number(1)|1|
|String|new String('1')|'1'|
|Boolean|new Boolean(false)|false|
|Symbol|new Object(symbol('a'))|symbol('a')|

举个例子
```javascript
var s1 = "abc";
var s2 = s1.indexOf("a"); // s1本原本是一相基本类型，不应该有方法，这个时候发生了装箱操作 相当new String('abc') 这个类里面的方法就可以调了
```
发生了什么
1. 创建String类型的一个实例；

2. 在实例上调用指定的方法；

3. 销毁这个实例；
```javascript
var s1 = new String("abc");
var s2 = s1.indexOf("a");
s1 = null 
```

#### 作业
```javascript
// 字符串转进十进制的数据   radix为原字符串的的进制
// 不能处理ob oc ox开头的
// radix 可以通过 判断得出
function StringToNumber(str,radix) {
  return parseInt(str,radix);
}
handleRadix(str) {
    // 16进制 0x开头(startsWith)  0-9 A-F
    // 8进制 0c开头   0-7
    // 2进制 0b开头    0-1
    // 10进制的    0-9 \. e
}
// 数字转字符串，radix是要转进多少进制的
function NumberToString(num,radix) {
  return num.toString(radix);
}
```