// 解析器
function tokenize(source) {
    let result = null;
    while(true) {
        let result = reg.exec(source);
        if(!result) {
            break;
        }
        for(let i=1; i <= dictionary.length; i++) {
            if(result[i]) {
                console.log(dictionary[i - 1]);
            }
        }
    }
}
// 正则跟字典的类型要一一对应
let reg = /([0-9.]+)|([ \t]+)|([\n\r])|(\+)|(\-)|(\*)|(\/)/g;
let dictionary = ['Number', 'Whitespace', 'LineTerminator', '+', '-', '*', '/'];
tokenize('3 + 2      - 1 / 4 ');