function kmp(source, pattern) {
    // 计算pattern表格
   
    function next(pattern){
        let table = new Array(pattern.length).fill(0); 
        let i = 1;
        j = 0; // i 比较的位置，不需要自己跟自己比较。 j 对应值的下标，也可以代表前面有几个值已匹配上了。

        while (i < pattern.length) {
            // 假如匹配上,则匹配下一位
            if (pattern[i] === pattern[j]) {
                i++, j++;
                table[i] = j;
            } else {
                if (j > 0) {
                    j = table[j];
                } else {
                    i++;
                }
            }
        }
    }

    // 匹配
    {
        let i = 0,
            j = 0;
        while (i < source.length) {
            if (pattern[j] == source[i]) {
                i++, j++;
            } else {
                if (j > 0) {
                    j = table[j];
                } else {
                    i++;
                }
            }
            if (j === pattern.length) {
                return true;
            }
        }
        return false;
    }
}

kmp('', 'abcabcd');