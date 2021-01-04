### 一、CSSOM css objent model   css对象模型

起点

document.styleSheets 对于多少个style或link
- cssRules
- insertRule('p {color: pink;}', 0)
- removeRule(0)

---

at-rule一一对应的
- CSSStyleRule
- CSSCharsetRule
- import
- media
- fontface
- page
- namespace
- keyframes
- supports
.
.
.

---
 CSSStyleRule
    - selectorText String
    - style k-v 结构

---
window.getComputedStyle(el, pseudoElt)

应用场景， transform 过渡动画中间态，比如之前做的砸金蛋，要记录上次旋转的位置，下次从上次位置开始。

### 二、CSSOM View

CSSOM View 这一部分的 API，可以视为 DOM API 的扩展，它在原本的 Element 接口上，添加了显示相关的功能，这些功能，又可以分成三个部分：窗口部分，滚动部分和布局部分，下面我来分别带你了解一下。

---

window api

- window.innerWidth window.innerHeight  实际使用的vierport
- window.outerWidth window.outerHeight  包括浏览器自带的工具栏
- window.devicePixelRatio      DPR   物理像素跟逻辑像素（代码的的px）比值， 比如说 dpr 2, 1个物理像素能显示四个逻辑点  
- window.screen     不常用
    - window.screen.widht
    - window.screen.height
    - window.screen.availWidht  可使用的屏幕，有些安卓机把底部的屏作为按钮了
    - window.screen.availHeight



- moveTo(x, y) 窗口移动到屏幕的特定坐标；
- moveBy(x, y) 窗口移动特定距离；
- resizeTo(x, y) 改变窗口大小到特定尺寸；
- resizeBy(x, y) 改变窗口大小特定尺寸。

```javascript
    // 注意第三个参数
    window.open("about:blank", "_blank" ,"width=100,height=100,left=100,right=100" )
```


---

scroll api

这个要分为两部分 视口滚动 元素滚动两部分


**视口滚动**

- window.scrollX  当前在x轴方向上滚动的距离   pageXoffset
- window.scrollY  当前在y轴方向上滚动的距离   pageYoffset
- window.scroll(X, Y) 使用页面滚动到指定位置 {top, left}  scrollTo()
- window.scrollBy(X, Y) 使用页面滚动指定位置,原来基本上添加 {top, left}  scrollTo()

要想监听视口滚动事件，我们需要在 document 对象上绑定事件监听函数：

```javascript

document.addEventListener("scroll", function(event){
  //......
})

```

**元素滚动**

- scrollTop 元素的属性，表示 Y 方向上的当前滚动距离。
    - scrollTop + clientY = pageY
- scrollLeft 元素的属性，表示 X 方向上的当前滚动距离。
- scrollWidth 元素的属性，表示元素内部的滚动内容的宽度，一般来说会大于等于元素宽度。
- scrollHeight 元素的属性，表示元素内部的滚动内容的高度，一般来说会大于等于元素高度。

- scroll(x, y) 使得元素滚动到特定的位置，有别名 scrollTo，支持传入配置型参数 {top, left}。
- scrollBy(x, y) 使得元素滚动到特定的位置，支持传入配置型参数 {top, left}。
- scrollIntoView(arg) 滚动元素所在的父元素，使得元素滚动到可见区域，可以通过 arg 来指定滚到中间、开始或者就近。

```javascript
element.addEventListener("scroll", function(event){
  //......
})

```

---

layout api

- getClientRects()   返回列表，元素生成的全部盒 可以用 x, y, width, height 来获取它的位置和尺寸
- getBoundingClientRect() 返回元素包含的所有盒的一个矩形区域  需要注意，这个 API 获取的区域会包括当 overflow 为 visible 时的子元素区域。

[demo](./demo/4-rects.html)

获取相对坐标，或者包含滚动区域的坐标，需要一点小技巧：
```javascript
var offsetX = document.documentElement.getBoundingClientRect().x - element.getBoundingClientRect().x;
```