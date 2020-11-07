学习笔记

### 一、使用proxy 实现双向绑定
发现没个问题
- effect 是立即调用回调函数的，回调函数里读取了对象的值，对把改对象进行依赖收集
- usedReactivties 里面存在大量数量，对象一直在变
### 二、拖拽

#### 1. clientX/pageX/screenX/offsetX

- screenX 和screenY
参照点：电脑屏幕左上角
screenX：鼠标点击位置相对于电脑屏幕左上角的水平偏移量
screenY：鼠标点击位置相对于电脑屏幕左上角的垂直偏移量

- clientX和clientY
参照点：浏览器内容区域左上角
clientX：鼠标点击位置相对于浏览器可视区域的水平偏移量（不会计算水平滚动的距离）
clientY：鼠标点击位置相对于浏览器可视区域的垂直偏移量（不会计算垂直滚动条的距离）

- pageX和pageY
参照点：网页的左上角
pageX：鼠标点击位置相对于网页左上角的水平偏移量，也就是clientX加上水平滚动条的距离
pageY：鼠标点击位置相对于网页左上角的垂直平偏移量，也就是clientY加上垂直滚动条的距离

- offsetX和offsetY
offsetX：鼠标点击位置相对于触发事件对象的水平距离
offsetY：鼠标点击位置相对于触发事件对象的垂直距离

![avatar](./img/pagex.jpg)

#### 2. createRange 比较少用到
> 概念： 
Range用来标识页面的范围，可以用两个边界点来生成一个Range对象

- 创建range对象 document.createRange()
- setStart setEnd 添加边界点
- insertNode 案例使用到的。插入一个节点，节点将被插入Range的起始边界点处。

#### 3. textContent、innerText、innerHTML

#### 4. childNodes、children、firstChild、lastChild



