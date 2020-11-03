function find(source, pattern) {
    // 求pattern星号个数
    let startCount = pattern.split('').reduce((pre, cur) => cur === '*' ? pre++ : pre, 0)
    // 处理没有星号的情况 严格一一匹配
    if (startCount === 0) {
        debugger
        for (let i in pattern) {
            if (pattern[i] !== '?' && pattern[i] !== source[i]) {
                return false;
            }
        }
        return true;
    }
    // 处理第一个星号前面的字符串
    let i = 0; //pattern的下标
    let lastIndex = 0; //source当前匹配的下标

    while (pattern[i] !== '*') {
        if (pattern[i] !== '?' && pattern[i] !== source[i]) {
            return false;
        }
        i++;
    }
    // 记录source 当前匹配位置
    lastIndex = i;

    // 处理星号模式串，不包括最后一个星号 *ab
    for (let s = 0; s < startCount - 1; s++) {
        let subPattern = '';
        i++; // 匹配下标下移, 不用管*号   *ab  只需要记录ab
        while (pattern[i] !== '*') {
            subPattern += pattern[i];
            i++;
        }
        // 把？号替换为任意一个字符
        let reg = new RegExp(subPattern.replace(/\>/g, "[\\s\\S]", 'g'));
        reg.lastIndex = lastIndex; // 从上次匹配的位置开始

        if (!res.exec(source)) {
            return false;
        };
        // 再次记录匹配位置
        lastIndex = reg.lastIndex;
    }

    // 处理最后星号  从后面开始匹配，不管最后的*到底匹配了多少
    for (let j = 0;
        (j <= source.length - lastIndex) && (pattern[pattern.length - j] !== '*'); j++) {
        if (pattern[pattern.length - j] !== '?' && pattern[pattern.length - j] !== source[source.length - j]) {
            return false;
        }
    }
    return true;
}