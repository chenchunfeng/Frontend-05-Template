class KMP {
    constructor() {

    }
    _next(pattern) {
        let len = pattern.length;
        let next = new Array(len).fill(0);
        let j = 0 // j前缀指针 i后缀指针   
        for(let i = 1; i < len; i++) {
            
            if (pattern[i] === pattern[j]) {
                j++;
                next[i] = j;
            } else {
                // ***** j位置回滚
                while(j > 0) {
                    j = j - 1;
                    if(pattern[i] === pattern[j]) {
                        j++;
                        next[i] = j;
                        break;
                    }
                }
            }
 
        
        }
        console.log(next)
        return next;
    }
     
    match(source, pattern) {
        if (pattern.length === 0) {
            return 0;  // 是空字符串时我们应当返回 0
        }
        let next = this._next(pattern);
        let j = 0;  // i为 source的对比下标 j为pattern的对比下标
         for(let i = 0; i < source.length; i++) {
             if (source[i] === pattern[j]) {
                 j++;
             } else {
                 // ***** pattern位置回滚
                 while(j > 0) {
                     j = next[j-1]; // 通过next 函数处理过的前缀重复数组
                     if(source[i] === pattern[j]) {
                         j++;
                         break;
                     }
                 }
             }
 
             if( j === pattern.length) {
                 return i - j + 1;   // 存在返回 返回出现的第一个位置
             }
         }
         return -1;  // 如果不存在，则返回  -1。
     }
}

let kmp = new KMP()
kmp.match('ab','ab');
// kmp.match('aabaabaaacx','aabaaac');