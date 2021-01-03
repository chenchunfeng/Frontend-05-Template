HTML学习笔记

### 一、定义 define

hypertext markup language

XML 与 SGML 是html的超集，但到了h5,html一门按受了xml sgml一定灵感的一门语言。  

SGML 主要是给 HTML 带来了 DTD 和 Entity。

- DTD document type definition
文档 https://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd

- enitity 实体 以另一种编码形式 表示 空格 小于号 & 等符号

    - https://www.w3.org/TR/REC-html40/HTMLspecial.ent
    - https://www.w3.org/TR/REC-html40/HTMLlat1.ent
    - href="https://www.w3.org/TR/REC-html40/HTMLsymbol.ent

    - amp &
    - nbsp  no break space  控制空格使用 white-space 
    - lt <  less than
    - gt > greater than
    - quot  quotation mark

对于XML 主要是[namespace](https://www.w3.org/TR/2011/WD-html5-20110525/namespaces.html) tag
 
- mathML
- svg
- html
- xhtml


white-space
 - no-wrap
 - pre
 - pre-wrap
 - pre-line

### 二、标签语义化

在很多工作场景里，语义类标签也有它们自己无可替代的优点。正确地使用语义标签可以带来很多好处。
- 语义类标签对开发者更为友好，使用语义类标签增强了可读性，即便是在没有 CSS 的时候，开发者也能够清晰地看出网页的结构，也更为便于团队的开发和维护。
- 除了对人类友好之外，语义类标签也十分适宜机器阅读。它的文字表现力丰富，更适合搜索引擎检索（SEO），也可以让搜索引擎爬虫更好地获取到更多有效信息，有效提升网页的搜索量，并且语义类还可以支持读屏软件，根据文章可以自动生成目录等等。

我支持在任何“软件界面”的场景中，直接使用 div 和 span。

用对”比“不用”好，“不用”比“用错”好。当然了，有理想的前端工程师还是应该去追求“用对”它们

 http://static001.geekbang.org/static/time/quote/World_Wide_Web-Wikipedia.html


- em(重读) strong(重要性 紧急性) b(标题 关键词)
- hgroup  主副标题
- main
- article
- nav
- adress
- aside 非主体部分 容易被理解为侧边栏，实际上二者是包含关系，侧边栏是 aside，aside 不一定是侧边栏。
- header，如其名，通常出现在前部，表示导航或者介绍性的内容。
- footer，通常出现在尾部，包含一些作者信息、相关链接、版权信息等。

是否要语义化的问题：我们应该分开一些场景来看语义，把它用在合适的场景下，可以获得额外的效果。
至少涉及了三个明确的场景：
- 自然语言表达能力的补充；
- 文章标题摘要；
- 适合机器阅读的整体结构。


### 二、语法 grammar？ syntax？

合法元素
- element  标签名 \<tagname>\</tagname>
- comment  注释  \<!-- comments -->
- text    文本
- document type  \<!doctype html>
- CDATA   <![CDATA[]]>
- ProcessingInStruction  <?a 1?>
