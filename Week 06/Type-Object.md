### 九 Object 

#### 1.对象的基础知识
- target 更贴切  object 翻译为”物件“
- 我们用状态来描述对象 我们状态的改变即是行为
- 对象三要素
    - behavior 行为
    - state    状态
    - indetifer  定义
- 类是描述对象的的常见方式
    - 分类法
    - 归类法

- js object 的原型链   Object.prototype.__poto__ === null
    - 作为对象只需要描述他与原型的区别即可

### 作业： 用 JavaScript 去设计狗咬人的代码 ### 
```javascript
// 我们用状态来描述对象 我们状态的改变即是行为
Class Dog {
    bite(human) {
        //....
    }
}
// 正确的作法，是写的人上身上，狗咬人，受伤的是人，该变了人的状态。假如是狗吃人就可以在狗类上面加eat
Class Human {
    hurt(damage) {
        //...
    }
}
```

#### 2.js对象

- js prototype 可以描述行为、状态
- 属性为 key value 结构
    - key 可以为 string symbol
- data prototype
    - value
    - writable
    - enumerable 
    - configurable 
- accessor prototype  存储
    - get
    - set
    - enumerable 
    - configurable 

- Object的api及语法分成四组
    1. {} [] Object.definePrototype()
    2. Object.crate() Object.setPrototypeOf() Object.getPrototypeOf()
    > 在进行俩个原型之间的委托时使用setPrototype更好，Object.create更适和直接对一个无原生原型的对象快速进行委托
    3. new class extends 
    4. new function prototype 尽量用第三点了
- Function Object
