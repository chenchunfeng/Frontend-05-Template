## flex

flexible box 弹性盒子。某个元素如果加上display:flex 则称为
- flex container 容器

其子元素则称为
- flex item 项目

本文列举容器及项目的相关属性

### 一、容器属性

- flex-direction
    - row  默认值
    - row-reverse
    - column
    - column-reverse

- flex-wrap
    - wrap 默认  换行，第一行在上方。
    - nowrap 
    - wrap-reverse  换行，第一行在下方。

- flex-flow  上面两个的合体
    - row wrap 

- justify-content  主轴对齐方式 
    - flex-start  默认
    - center
    - flex-right
    - space-around    两边还有空白
    - space-between   两没空白了

- align-item 交叉对齐方式
    - flex-start  默认
    - center
    - flex-right
    - baseline  项目的第一行文字的基线对齐
    - stretch  如果项目未设置高度或设为auto，将占满整个容器的高度。
- align-content  多条主轴时生效 交叉轴方向
    - flex-start  默认
    - center
    - flex-right
    - space-around    两边还有空白
    - space-between   两没空白了
    - stretch

### 二、项目属性
- order 排序  默认 0
    - 数字越小越前 整数 可以为负数

- flex-grow 放大比例 默认为0
- flex-shrink 缩小比例 默认为1 这里就容易出来，越出main size 发现元素按比例缩小
- flex-basis 默认auto  指定了 flex 元素在主轴方向上的初始大小
- flex 上面三个的集合(flex-grow flex-shrink flex-basis)
    - auto (1 1 auto)
    - none (0 0 auto)
    - 平时写flex: 1 相当于flex-grow: 1
- align-self 自身交叉轴对齐方式




[大佬的总结](http://static.vgee.cn/static/index.html)
