## 学习笔记
### 一、四则运算
- tokenNumber operator whitespace lineterminator
- AST 抽象语法树 （Abstract Syntax Tree)
- LL 从左到右解析 LR   left right

- TokenNumber: 1 2 3 4 5 6 7 8 9 0 的组合
- Operator: +、-、*、/ 之一
- Whitespace：<sp>
- LineTerminator：<LE> <CR>
### 二、正则表达式
- 通过正则捕获代码表达式中的tokenNumber operator
### 三、词法分析 tokenize 完善
- regexp.lastIndex 下一次开匹配的位置
- 过滤其它类型字符
- 迭代器 generator
- 添加EOF end of file

### MultiplicativeExpresstion
![avatar](./multi.png)
### AddicativeExpression

![avatar](./add.png)

### Expresstion 把AddicativeExpression添加终结符
### 总结
1. 通过tokenize 解析表达式的的tokenNumber 和 operator 生成 source
2. MultiplicativeExpresstion 最底层 要把Number 处理成 MultiplicativeExpresstion 再把 MultiplicativeExpresstion + operator（*|/） 合并成新节点 递归处理
3. AddicativeExpression 要先调用MultiplicativeExpresstion， 把MultiplicativeExpresstion处理成AddicativeExpression再把 AddicativeExpression + operator（+|-） 合并成新节点 递归处理
4. Expresstion 要先调用AddicativeExpression + EOF 生成新节点

一脸懵逼, 跟着敲 只能从代码反推产生式原理！！
https://zhuanlan.zhihu.com/p/112460676  网上找的相关文章（还没消化）