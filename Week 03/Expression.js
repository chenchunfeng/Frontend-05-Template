
// 解析器
function* tokenize(source) {
    let result = null;
    let lastIndex = null;
    while(true) {
        lastIndex = reg.lastIndex;
        result = reg.exec(source);
        // 最后匹配为null
        if(!result) {
            break;
        }

        // 判断匹配的长度跟返回的结果是否一样，可能存在不认识的字符
        if(result[0].length < reg.lastIndex - lastIndex) {
            throw Error(`!! found unknown type sign ->：[${source.slice(lastIndex, reg.lastIndex)}] !!`);
        }

        let token = {
            value: null,
            type: null
        }
        for(let i=1; i <= dictionary.length; i++) {
            if(result[i]) {
                token.value = result[i];
                token.type = dictionary[i - 1];
                yield token;
            }
        }
    }
    yield {value: null, type: 'EOF'};
}

// 正则跟字典的类型要一一对应
let reg = /([0-9.]+)|([ \t]+)|([\n\r])|(\+)|(\-)|(\*)|(\/)/g;
let dictionary = ['Number', 'Whitespace', 'LineTerminator', '+', '-', '*', '/'];


let source = [];
for(let token of tokenize('3*2/2 + 3')) {
    console.log(token);
    // 过滤空格 换行等类型
    if(token.type !== 'Whitespace' && token !== 'LineTerminator') {
        source.push(token);
    }
    
}
console.log(Expression(source));
//  乘除表达式
function MultiplicativeExpression(source) {
    // 当第一个为数字时，表达式开始
    if (source[0].type === 'Number') {
        source[0] = {
            type: 'MultiplicativeExpression',
            children: [source[0]]
        };
        // 递归查找 后面两个值
        return MultiplicativeExpression(source);
    }
    // 如果后面一位是 * 或且 / 合并为一项
    if (source[0].type === 'MultiplicativeExpression' && source[1] && source[1].type === '*') {
        let node = {
            type: 'MultiplicativeExpression',
            operator: '*',
            children: []
        };
        node.children.push(source.shift());
        node.children.push(source.shift());
        node.children.push(source.shift());
        source.unshift(node);
        // 递归查找
        return MultiplicativeExpression(source);
    }
    // 除法同理
    if (source[0].type === 'MultiplicativeExpression' && source[1] && source[1].type === '/') {
        let node = {
            type: 'MultiplicativeExpression',
            operator: '/',
            children: []
        };
        node.children.push(source.shift());
        node.children.push(source.shift());
        node.children.push(source.shift());
        source.unshift(node);
        // 递归查找
        return MultiplicativeExpression(source);
    }
    // 合并到最后，后面已经不是乘法或者除 返回合并结果
    if ( source[0].type === 'MultiplicativeExpression' ) {
        return source[0]
    }
}
//  加减表达式 包含乘除

function AdditiveExpression(source) {
    // 当第一个为数字时，表达式开始
    if (source[0].type === 'MultiplicativeExpression') {
        source[0] = {
            type: 'AdditiveExpression',
            children: [source[0]]
        };
        // 递归查找 后面两个值
        return AdditiveExpression(source);
    }
    // 如果后面一位是 * 或且 / 合并为一项
    if (source[0].type === 'AdditiveExpression' && source[1] && source[1].type === '+') {
        let node = {
            type: 'AdditiveExpression',
            operator: '+',
            children: []
        };
        node.children.push(source.shift());
        node.children.push(source.shift());
        MultiplicativeExpression(source);
        node.children.push(source.shift());
        source.unshift(node);
        // 递归查找
        return AdditiveExpression(source);
    }
    // 除法同理
    if (source[0].type === 'AdditiveExpression' && source[1] && source[1].type === '/') {
        let node = {
            type: 'AdditiveExpression',
            operator: '/',
            children: []
        };
        node.children.push(source.shift());
        node.children.push(source.shift());
        MultiplicativeExpression(source);
        node.children.push(source.shift());
        source.unshift(node);
        // 递归查找
        return AdditiveExpression(source);
    }
    // 合并到最后，后面已经不是乘法或者除 返回合并结果
    if ( source[0].type === 'AdditiveExpression' ) {
        return source[0]
    }
    MultiplicativeExpression(source);
    return AdditiveExpression(source);

}
// 最终版 添加终结符
function Expression(source) {
    // 当第一个为数字时，表达式开始
    if (source[0].type === 'AdditiveExpression' && source[1] && source[1].type === 'EOF') {
        let node = {
            type: 'Expression',
            children: [source.shift(), source.shift()]
        };
        source.unshift(node);
        return node;

    }
    AdditiveExpression(source);
    return Expression(source);
}