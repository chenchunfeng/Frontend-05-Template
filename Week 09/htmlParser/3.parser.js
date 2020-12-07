
const css = require('css');  // 处理css tree
const EOF = Symbol('EOF');
let currentToken = null;
let currentAttribute = null;
let currentTextNode = null;
let stack = [
    {
        type: 'document',
        children: []
    }
]
// 把css规则都存到一个数组中
let rules = [];
function addCSSRules(text) {
    let ast = css.parse(text); // 借助css包解析
    console.log(JSON.stringify(ast, null, "  "));
    rules.push(...ast.stylesheet,rules);
}

// 构建dom树
function emit(token) {
    let top = stack[stack.length - 1];
    if(token.type == 'startTag') {
        let element = {
            type: 'element',
            children: [],
            attributes: []
        };
        element.tagName = token.tagName;

        for(let p in token) {
            if(p != 'type' && p != 'tagName') {
                element.attributes.push({
                    name: p,
                    value: token[p]
                })
            }
        }
        top.children.push(element);
        if(!token.isSelfClosing) {
            stack.push(element);
        }

        currentTextNode = null;
        return ;
    }

    if(token.type == 'endTag') {
        if(top.tagName != token.tagName) {
            throw new Error('tag start end doesn\'t match!');
        } else {

            // css规则操作
            if(top,tagName === 'style') {
                addCSSRules(top.children[0].content);
            }
            stack.pop();
        }

        currentTextNode = null;

        return ;

    }

    if(token.type = 'text') {
        if(currentTextNode == null ){
            currentTextNode = {
                type: 'text',
                content: ''
            }
            top.children.push(currentTextNode);
        }
        currentTextNode.content += token.content;
    }
}

const EOF = Symbol('EOF');

// 状态机初始状态
function data(c) {
    if( c === '<') {
        return tagOpen; // 标签开始
    }

    if(c === EOF) {
        return ; // 文件终结
    }
    // 创建标签
    emit({
        type: 'text',
        content: c
    })
    return data; //文本节点
}

// 标签开始，这个时候还不知道标签类型
function tagOpen(c) {
    if(c === '/') {
        return endTagOpen; // 标签结束
    }
    if(c.match(/^[a-zA-z]$/)) {
        // 开始标签token
        currentToken = {
            type: 'startTag',
            tagName: ''
        }
        return tagName(c);  // 标签名称
    }

    return ;
}
// 标签结束，这个时候还不知道标签类型
function endTagOpen(c) {

    if(c.match(/^[a-zA-z]$/)) {
        // 开始标签token
        currentToken = {
            type: 'endTag',
            tagName: ''
        }
        return tagName(c);  // 标签名称
    }

    if(c === '>') {
        // ??
    }

    if(c === EOF) {
        // ??
    }

    // '/'后面只能跟字母做为标签名，其它的错误情况
}

function tagName(c) {
    // <html prop...  属性
    if(c.match(/^[\t\n\f ]$/)) {
        return beforAttributeName;
    }
    // <html/> 自封闭标签
    if(c === '/') {
        return selfColsingStartTag;
    }
    // 还是标签名
    if(c.match(/^[a-zA-Z]$/)) {
        // 收集tagName字符
        currentToken.tagName += c; //.toLowerCase();
        return tagName;
    }
    // 标签结束，找下一个标签
    if(c === '>') {
        //结束
        emit(currentToken);
        return data;
    }

    return tagName;

}
// 处理属性
function beforAttributeName(c) {
    // <html prop...  属性
    if(c.match(/^[\t\n\f ]$/)) {
        return beforAttributeName;
    }
    // 属性结束
    if(c === '/' || c === '>' || c === EOF) {
        return affterAttrituteName(c);
    }


    // // <html/> 自封闭标签
    // if(c === '>') {
    //     return data;
    // }
    // 还是标签名
    if(c === '=') {
        // 报错
    }

    currentAttribute = {
        name: '',
        value: ''
    }
    return attributeName(c);
}
// 记录属性名
function attributeName(c) {
    // 结束
    if(c.match(/^[\t\n\f]$/) || c === '/' || c === EOF) {
        return affterAttrituteName(c);
    } 
    // 开始记录属性值
    if(c === '=') {
        return beforAttributeValue;
    }
    // 空
    if(c === '\u0000') {
        // 报错
    }

    if( c === '\"' || c === '\'' || c === '<') {
        // 报错
    }

    currentAttribute.name +=c;
    return attributeName;
}

// 处理属性值
function beforAttributeValue(c) {
    // <html prop...  属性
    if(c.match(/^[\t\n\f ]$/) || c === '/' || c === EOF || c === '>') {
        return beforAttributeValue;
    }

    // 发现有双引号
    if( c === '\"') {
        return doubleQuotedAttributeValue;
    }
    // 发现有单引号
    if( c === '\'') {
        return singleQuotedAttributeValue;
    }

    return UnQuoteAttributeValue(c);
}
// 只找双引号结束
function doubleQuotedAttributeValue() {
    if( c === '\"') {
        currentAttribute[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    }
    if(c === EOF) {
        
    }
    // 空
    if(c === '\u0000') {
        // 报错
    }

    currentAttribute.value +=c;
    return doubleQuotedAttributeValue;
}
// 只找单引号结束
function singleQuotedAttributeValue() {
    if( c === '\'') {
        currentAttribute[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    }
    if(c === EOF) {
        
    }
    // 空
    if(c === '\u0000') {
        // 报错
    }

    currentAttribute.value +=c;
    return singleQuotedAttributeValue;
}
function afterQuotedAttributeValue() {
    if(c.match(/^[\t\n\f ]$/)) {
        return beforAttributeName;
    }
    if(c == '/') {
        return selfColsingStartTag;
    }
    if(c == '>') {
        currentToken[currentAttribute.name] = currentAttribute.vlaue;
        emit(currentToken);
        return data;
    }
    if(c == EOF) {

    }
    currentAttribute.vlaue += c;
    return doubleQuotedAttributeValue;
}
// 无引号属性
function UnQuoteAttributeValue() {
    // 保存属性值
    if(c.match(/^[\t\n\f ]$/)) {
        currentToken[currentAttribute.name] = currentAttribute.vlaue;
        return beforAttributeName;
    }
    // 自封闭
    if( c === '/') {
        currentAttribute[currentAttribute.name] = currentAttribute.value;
        return selfColsingStartTag;
    }
    // 结束
    if( c === '>') {
        currentAttribute[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    }

    // 空
    if(c === '\u0000') {
        // 报错
    }

    if(c == '\'' || c == '\"' || c == '<' || c == '=') {

    }

    if(c == EOF) {

    }

    currentAttribute.value +=c;
    return UnQuoteAttributeValue;
}
// <html/> 后面只会跟 >
function selfColsingStartTag(c) {
    if(c === '>') {
        // 标记为自封闭标签 下一轮开始
        currentToken.isSelfClosing = ture;
        return data;
    }

    if(c === 'EOF') {

    }

    // 后面跟任何东西都是报错的了
}

module.exports.parseHTML = (html) => {
    let state = data;
    for(let c of html) {
        state = state(c);
    }
    state = state(FOF); //小技巧， 有些html有没终止符
    return stack[0];  
} 