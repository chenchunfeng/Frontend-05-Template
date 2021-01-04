### 一、DOM document objent model   文档对象模型

顾名思义，文档对象模型是用来描述文档，这里的文档，是特指 HTML 文档（也用于 XML 文档，但是本课不讨论 XML）。同时它又是一个“对象模型”，这意味着它使用的是对象这样的概念来描述 HTML 文档。

分为四部分

- node 树形结构节点相关api
- range  操作文字相关api
- 事件  触发与监听相关api
- 遍历  遍历dom相关api

### 二、节点 node

<img src="./images/node.png" style="width:500px;height:300px">

--- 
导航类api
<img src="./images/node-nav.png" style="width:400px;height:200px">

node: 
- parentNode
- childNodes
- firstChild
- lastChild
- nextSibling
- previousSiblig

element
- parentElement
- children
- firstElementChild
- lastElementChild
- nextElementSibling
- previousElementSibling

如果使用node的导航，会出现很多空白 、换行、等文本节点，不能很直观地定位导航，所以平时很少用node的导航节点。这里的parentNode 跟 parentElement 是指向同一节点


---

操作修改类api(在父元素上操作)

- appendChild
- insertBefore
- removeChild
- replaceChild

---

高级api

- compareDocumentPostion 比较两个节点的关系
- contains          检查一个节点是否包含另一个节点
- isEqualNode   检查两个节点是否相同
- isSameNode    检查节点是否为同一个节点  ===
- cloneNode 复制一个节点，如果传入参数true 深拷贝，否则，它只复制当前节点。

---
创建节点

DOM 标准规定了节点必须从文档的 create 方法创建出来，不能够使用原生的 JavaScript 的 new 运算

- createElement
- createTextNode
- createCDATASection
- createComment
- createProcessingInstruction
- createDocumentFragment
- createDocumentTyle

---

操作属性 把属性当作字符串看待

- getAttribute
- setAttribute
- removeAttribute
- hasAttribute

- getAttributeNode
- setAttributeNode

document.body.attributes.class = “a” 
等效于 document.body.setAttribute(“class”, “a”)

--- 

查找元素

- querySelector
- querySelectorAll
- getElementById
- getElementByName
- getElementByTabName
- getElementByClassName

getElementsByName、getElementsByTagName、getElementsByClassName 获取的集合并非数组，而是一个能够动态更新的集合。


### 三、事件api

常用事件 https://developer.mozilla.org/zh-CN/docs/Web/Events 
三种设备触摸屏、鼠标、键盘
触摸屏
- onclick 点击
- ondbclick 双击
鼠标
- oncontextmenu
- onmousedown
- onmouseup
- onmousemove
- onmouseover
- onscroll

键盘
- onkeydown
- onkeyup
- onkeypress
UI事件
- onload
- onerror

焦点事件
- onblur
- onfocus
.
.
.

---
element.addEventListener(event, function, useCapture)
 向指定元素添加事件监听
 useCapture 是否捕获时触发
 第三个参数也可以是一个对象
 {
     once: 只执行一次
     passive: 承诺此事件监听不会调用 preventDefault，这有助于性能。
     useCapture: 是否捕获
 }

 **捕获过程跟冒泡过程总是先后发生，但跟你是否监听无关**

 大概原理是先计算点击的位置即为捕获，找到点击的元素，向外触发即为冒泡过程。

### 四、range

Range API 表示一个 HTML 上的范围，这个范围是以文字为最小单位的，所以 Range 不一定包含完整的节点，它可能是 Text 节点中的一段，也可以是头尾两个 Text 的一部分加上中间的元素。

作用，操作批量节点，操作半个节点。

这节由一个问题展开
把一个元素所有子元素逆序
比如 1 2 3 4 5 变为 5 4 3 2 1

```javascript
// 先简单思路，找到所有节点，然后倒序 再循环插入父节点下面
// 两个考点 1. 一个节点使用insert操作时，会自己remove下来，再append到新dom树上。 2. dom的collection 是活的。

    let element = document.getElementById('a');

    function reverseChildren(element) {
        // 返回的是普通array 不是living collection
        let children = Array.prototype.slice.call(element.childNodes);

        for(let child of children) {
            element.removeChild(child);
        }

        children.reverse();

        for(let child of children) {
            element.appendChild(child);
        }
    }

    reverseChildren(element);

    // 进阶版

    function reverseChildren(element) {
        let len = element.childNodes.length;

        while(len-- > 0) {
            element.appendChild(element.childNodes[len]);
        }
    }

    reverseChildren(element);


// 最终版，使用range 的fragment处理，减少重绘

```
先学习相关api
创建
- var range = new Range()
- range.setStart(element, 9);  偏移值  文本节点即为文本字符 元素节点即为层级
- range.setEnd(element, 4);
- var range = document.getSelection().getRangeAt(0);  鼠标选中的一个区域
因为代码格式问题，可能存在很多空白转行节点，offset不好控制，就有了下面的操作
- range.setStartBefore
- range.setEndBefore
- range.setEndAfter
- range.setStartAfter
- range.setStartBefore
- range.selectNode
- range.selectNOdeContents

提取，从dom树摘下来
var fragment = renge.extractContents();
某个片段中插入节新节点
range.insertNode(document.createTextNode('aaaa));

[基本使用案例](./demo/3-range.html)

最后使用range 实现 reverse问题
```javascript
// 使用节点api 会引起length - 1 次重排
// 但使用range api 把节点摘下来，再append回，只需要两次
    function reverseChildren(element) {
        let range = new Range();
        range.selectNodeContents(element);
        let fragment = range.extractContents();  // 摘下来
        let len = fragment.childNodes.length;

        while(len-- > 0) {
            fragment.appendChild(fragment.childNodes[len]);
        }

        element.appendChild(fragment); // 批量append回去
    }
```
### 五、遍历 iterator

```javascript
// NodeIterator
var iterator = document.createNodeIterator(document.body, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_COMMENT, null, false);
var node;
while(node = iterator.nextNode())
{
    console.log(node);
}

// TreeWalker
var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, null, false)
var node;
while(node = walker.nextNode())
{
    if(node.tagName === "p")
        node.nextSibling();
    console.log(node);
}
```

淘汰，建议需要遍历 DOM 的时候，直接使用递归和 Node 的属性。
