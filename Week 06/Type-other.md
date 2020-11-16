### 九 其它类型

- Boolean
    - true
    - false

- Null & Undefined
    - Null 有值，但是null 关键字
    - Undefined 值未定义  跟null 语义的区别 不是关键字
    - Void 0  产生undefined

```javascript
typeof null // object 
typeof undefined // undefined 

// 好东西
Object.prototype.toString.call(null) // [object Null]
Object.prototype.toString.call(undefined) // [object Undefined]
```