学习笔记

### HTML解析（把response.body解析成dom)

#### 第一步
- 为了方便文件管理，把parser单独拆分文件
- parser接受HTML文本作为参数，返回dom树
#### 第二步

- 使用FSM 状态机来实现HTML的分析
- 在HTML标准中，已经规定了其状态
- toy-browser只挑选了一部分状态，完成最简单版本

#### 第三步 解析标签

- 三种标签
    - 开始
    - 结束
    - 自封闭
- 暂时忽略属性

#### 第四步 创建元素 
- 在状态机中，除了状态迁移，还可以加入业务逻辑
- 标签结束状态才提交标签token

#### 第五步 处理属性

    - \t 制表符
    - \n 回车换行   回去\r
    - \f 换页
    - \u0000 空白字符 并不是空格

- 属性值分为单引号 双引号 无引号
- 处理属性的方式跟标签类似
- 属性结束时，我们把属性加到标签Token上

#### 第六步 token构建DOM树  由词法到语法  先不处理文本节点

这块代码写在emit里面

-  基本技巧，就是使用栈
- 创建标签入栈 结束标签出栈
- 自封闭可视为放栈立刻出栈
- 任何元素的父元素都是它入栈前的栈顶

#### 第七步 处理token的文本节点

- 文本节点与自封闭标签处理是类似的
- 外个文本节点需要合并

### CSS computing 计算css


#### 第一步 收集css规则

parser代码中， 在发现结束标签的时候，如果标签名是style 则把content添加进规则中，npm 安装 css 包解析css.parser ast树

#### 第二步 添加调用

- 当dom构建创建元素startTag入栈 ，立即计算css
- 有个前提，css规则收集完毕 head里面的css就无法计算了
- 还有body的style标签，需要重新计算，课程中忽略

#### 第三步 父元素序列

标签节点是从根到的子的，但css是先到子元素再找父节点的匹配规则的。

比如 div div #myid
- 从右到左，先找到#myid
- 再找上一级是div tag
- 再找上上级是div tag的元素

#### 第四步 元素和选择器 匹配

- 这里匹配只考虑了后代 空格的选择器

#### 第五步 计算元素和选择器是否匹配

```javascript
// 简单选择器 只考虑了id class tagName三种
function match(element, selector) {
    if(!selector || !element.attributes) {
        return false;
    }
    // id选择器
    if (selector.charAt(0) === '#') {
        let attr = element.attributes.filter(attr => attr.name === 'id')[0];
        if(attr && attr.vlaue === selector.replace('#', '')) {
            return ture;
        }
    }
    // class 选择器
    if (selector.charAt(0) === '.') {
        let attr = element.attributes.filter(attr => attr.name === 'class')[0];
        if(attr && attr.vlaue === selector.replace('.', '')) {
            return ture;
        }
    }
    // 标签 选择器
    if (element.tagName === selector) {
        return ture;
    }

    return false;
}

//实现支持空格的 Class 选择器
function match(element, selector) {
    if(!selector || !element.attributes) {
        return false;
    }
    // id选择器
    if (selector.charAt(0) === '#') {
        let attr = element.attributes.filter(attr => attr.name === 'id')[0];
        if(attr && attr.vlaue === selector.replace('#', '')) {
            return ture;
        }
    }
    // class 选择器
    if (selector.charAt(0) === '.') {
        let attr = element.attributes.filter(attr => attr.name === 'class')[0];
        // class= "class1 class2" 类似这种的class属性
        if(attr && attr.value.split(' ').indexOf(selector.replace('.', '')) >= 0) {
            return ture;
        }
    }
    // 标签 选择器
    if (element.tagName === selector) {
        return ture;
    }

    return false;
}

// 复合选择器
// 使用正则处理 复合选择器
- 伪元素 .a::select
- 伪类  .a:after
- 子类  .a>.b
- 并集 .a#b
- 交集 .a,.b
- 相邻 +
- 属性  .a[atr='xxx']

// TODO
// 
}
```
这里扩展下伪类: 伪元素(::)双冒号  css2两个都是单冒号 css3为了区别增加双冒号
伪元素 -> 不存的的元素， 一定条件下添加新标签才会有效果  注意是-元素

|属性|描述|
|--|--|
|:first-letter|向文本的第一个字母添加特殊样式|
|:first-line|向文本的第一行添加特殊样式|
|:first-before|在元素之前添加|
|:first-after|在元素之后添加|

--:after还有一个妙用，那就是清除浮动，给父元素追加:after之后，设置content：“ ”;clear:both;   就可以清除浮动--

伪类-> 对于原本存在的标签，在某个条件下，触发的样式。注意 - 类
|属性|描述|
|--|--|
|:active|被激活样式|
|:fouces|输入焦点样式|
|:hover|鼠标放上样式|
|:link|未被访问的链接|
|:visited|已访问的链接|
|:lang|带有lang的属性的元素添加样式|
|:first-child|在元素的第一个子元素添加|

#### 第六步 生成computed属性

- 元素成css规则一旦匹配上，就形成computedStyle

#### 第六步 specificity（特征 专一性）  css 优先级问题    priority 直译才是优化级

四元组表示
[0, 0, 0, 0]
inline id class tag

div #my #id .class
[0, 2, 1, 1]

- 行内元素权重最高>id>class>标签
- 高位如果大，不用再考虑低位
    例如 [1,9,9,9] 和 [0,9,9,9] 第一位的值如果大，后面的就不用参加比较了

代码实现吗？
```javascript
    // 记录优先级
    function specificity(selector) {
        // 空格打散成数组 循环判断开头字母
        let p = [0,0,0,0];
        let selectorParts = selector.split(' ');
        for(let part of selectorParts) {
            if(part.charAt(0) === '#') {
                p[1] +=1;
                continue;
            }
            if(part.charAt(0) === '.') {
                p[2] +=1;
                continue;
            }
            p[3] +=1;
        }
        return p
    }

    // 比较优先级  只有前面的相等为零，才会走下一们
    function compare(p1, p2) {
        if(p1[0] - p2[0]) {
            return p1[0] - p2[0];
        }
        if(p1[1] - p2[1]) {
            return p1[1] - p2[1];
        }
        if(p1[2] - p2[2]) {
            return p1[2] - p2[2];
        }

        return p1[3] - p2[3];
        
    }
```

- css 规则根据specificity和后来优先级规则覆盖的
- specifity是个四元组，越左权重越高
- 一个css规则的specificity根据包含的简单选择器相加而成


到目前为止，我们实现了http 请求 -> 返回的response 解析成dom树 -> css 同解析成树，根据dom树的结构，计算并挂上coputedStyle

// chartAt 可以使用startsWith
作业：  selectorParts 里面去解析复合选择器
```javascript
    //TODO
    // 正则或者状态机实现
    // 处理并集情况  .a#b

    function selectorParts(selector) {
        let selectorArr = [];
        let currentName = '';
        for(let c of selector) {
            if(c === '.' || c === '#') {
                // 记录上一个，并重新开始记录
                if(currentName.length > 0) {
                    selectorArr.push(currentName);
                }
                currentName = c;

            } else {
                currentName += c;
            }
        }

        if(currentName.length > 0) {
            selectorArr.push(currentName);
        }

        return selectorArr;
    }


    



    
```
