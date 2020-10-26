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

for(let token of tokenize('3 + 2a   - 1 / 4 ')) {
    console.log(token);
}