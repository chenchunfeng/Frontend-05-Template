# 学习笔记
## 一、游戏tic tac toe
### 1、回顾vertical-align line-height 一对好基友
- line-height行高的定义文本上下行两基线的间距；
- vertical-align的默认值就是基线；
些话怎样讲， vertical-align 可以使用百分比，其对应的为line-height的值

```css
.hello {
    line-height: 100px;
    vertical-align: 10%;
    /* vertical-align: 10px; */
}
```
#### 先提一个常见的问题 文本与icon 垂直居中问题
```css
.hello {
    height: 1ex;
}

/* ex 相到于1 x-height  很少见的单位*/
```
#### 另一个常见问题 div 里面的img有空隙
主要的原因是img 后面的空格默认baseline对齐，其行高顶开

解决方法 
1. img block
2. 使用其他vertical-align值
3. 设置小的行高
4. 设置font-size line-height的值是相对于其字体大小

垂直居中？
下面有空隙
line-height 等于 height
vertical-align middle  -> 行内元素上下边缘的中点与行框基线+x字母高度的一半对齐


### 2、bestChoice 
策略 
1. 我能赢 
2. 不能输
->使用递归判断对方能赢的点
## 二、红绿灯
1. callback 缺点明显 回调嵌套严重 维护阅读性差
2. promise  把setTimeout promise化  回调调用转成链式调用
3. async await promise的语法糖 以同步的形式编写异步代码