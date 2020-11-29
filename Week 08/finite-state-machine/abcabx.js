// abcabx   这里ab 是重复的

const match = (str) => {
    let state = start; // 初始状态
    let i = 0
    for(let char of str) {
        state = state(char);
        console.log(++i);
    }
    return state === end;  // 判断状态是否能结束函数
}

const start = (char) => {
    if (char === 'a') {
        return foundA;
    } else {
        return start;
    }
}
const foundA = (char) => {
    if (char === 'b') {
        return foundB;
    } else {
        return start;
    }
}
const foundB = (char) => {
    if (char === 'c') {
        return foundC;
    } else {
        return start;
    }
}
const foundC = (char) => {
    if (char === 'a') {
        return foundA2;
    } else {
        return start;
    }
}
const foundA2 = (char) => {
    if (char === 'b') {
        return foundB2;
    } else {
        return start;
    }b
}
const foundB2 = (char) => {
    if (char === 'x') {
        return end;
    } else {
        return foundB;  //  不是回到最开始的位置
    }
}

const end = (char) => {
    return end;
}

console.log(match('abcaba'))