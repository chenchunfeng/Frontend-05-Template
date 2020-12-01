// 我们如何用状态机处理完全未知的 pattern？ （参考资料：字符串 KMP 算法 
// https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm）

class StateKMP {
    constructor() {
        // 保存当前状态函数
        this.state = null;
        // 保存所有状态函数
        this.funTable = null;
        // 结束
        this.endFun = () => {
            return this.endFun;
        }
    }
    // 构建pattern kmp前缀表（具体原理参数第四周）
    _buildTableKMP(pattern) {
        let len = pattern.length;
        let table = new Array(len).fill(0);
        // i 后缀指针 j 前缀指针
        let j = 0;
        for(let i=1; i < len; i++) {
            // 发现重复 前缀指针下移 其位置记录重复数
            if(pattern[i] === pattern[j]) {
                j++;
                table[i] = j;
            } else {
                // 前缀指针回撤
                while(j > 0) {
                    j = j - 1;
                    if(pattern[i] === pattern[j]) {
                        j++;
                        table[i] = j;
                        break;
                    }
                }
            }
        }

        return table;

    }
    // 构造状态函数
    _buildStateFun(pattern, tableKMP) {
        let len = pattern.length;
        let funTable = new Array(len);

        for(let i=0; i < len;i++) {
            funTable[i] = (char) => {
                if (char === pattern[i]) {
                    return i === len - 1 ? this.endFun : funTable[i + 1];
                } else {
                    // 这里就要根据kmp 回溯操作，注意这里的函数是自执行的
                    return i - 1 > 0 ? funTable[tableKMP[i - 1]](char) : funTable[0]
                }
            }
        }
        this.funTable = funTable;
    }
    // 匹配
    match(source, pattern) {
        let kmpPrefix = this._buildTableKMP(pattern);
        this._buildStateFun(pattern, kmpPrefix);
        this.state = this.funTable[0]; // 初始状态
        for(let char of source) {
            this.state = this.state(char);
        }
        return this.state === this.endFun;  // 判断状态是否能结束函数

    }
}

let stateKMP = new StateKMP();
// example
console.log(stateKMP.match('abdfsdfsdfsd', 'abcabx'));
console.log(stateKMP.match('abcabcabx', 'abcabx'));
console.log(stateKMP.match('abcabcabx', 'abcabxa'));
console.log(stateKMP.match('abc', 'b'));
console.log(stateKMP.match('ababac', 'abac'));
