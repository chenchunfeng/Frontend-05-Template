## 有限状态机（finite state machine)
- 看到这个名字，给我的第一感觉是，有限对应无限。但实际上，这个有限可以忽略，就当成状态机来理解。
- 状态机，关注点是机（机器），而不是状态。每个机器都是独立 解耦的。
- 每一个状态机的输入都是一样的。
- 每一个状态机都要知道下一个状态机
    - moore  下一个状态机  是确认的
    - mealy  根据输入决定下一个状态机是什么

---
## JS实现有限状态机（mealy)
```javascript
// 每一个状态机都是一个函数 其参数则为输入
const state = (input) => {
    // 处理逻辑 决定下一个next是谁
    return next; // 返回下一个状态值
}
// 开始调用
while (input) {
    state = state(input);  // 返回值作为下一个状态
}

```

## 不使用状态机，判断字符串是否有a
```javascript
const matchA1 = (str) => {
    return str.indexOf('a') !== -1;
}
const matchA2 = (str) => {
    for(let char of str) {
        if (char === 'a') {
            return true;
        }
    }
    return false;
}
console.log(matchA1('dfsadf')); // true 
console.log(matchA1('dfsdf')); // false 
```

## 不使用状态机，判断字符串是否有ab
```javascript
const matchAB1 = (str) => {
    return str.indexOf('ab') !== -1;
}

// 下标加一法
const matchAB2 = (str) => {
    let len = str.length;
    for(let index in str) {
        if (str[index] === 'a') {
            let nextIndex = +index + 1;
            if(nextIndex < len && str[nextIndex] === 'b') {
                return true;
            }
        }
    }
    return false;
}
// 状态标志法
const matchAB3 = (str) => {
    let foundA = false;
    for(let char of str) {
        if (char === 'a') {
            foundA = true;
        } else if (foundA && char === 'b') {
            return true;
        } else {
            foundA = false;
        }

    }
    return false;
}

console.log(matchAB1('i ab c')); // true 
console.log(matchAB1('i acb c')); // false 
console.log(matchAB2('i ab c')); // true 
console.log(matchAB2('i acb c')); // false 
console.log(matchAB3('i ab c')); // true 
console.log(matchAB3('i acb c')); // false 
```
## 不使用状态机，判断字符串是否有abcdef

跟上面其实一样，继续嵌套if else 新增多几个标志

--- 

## 状态机实现

```javascript
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
        if (char === 'd') {
            return foundD;
        } else {
            return start;
        }
    }
    const foundD = (char) => {
        if (char === 'e') {
            return foundE;
        } else {
            return start;
        }
    }
    const foundE = (char) => {
        if (char === 'f') {
            return end;
        } else {
            return start;
        }
    }
    // 
    const end = (char) => {
        return end;
    }
```

## 状态机 结合 KMP 处理任意pattern

1、kmp 需要把pattern 构造一个数组，记得重复数
2、通过重复数构建数组 构建状态机
3、循环匹配状态函数，真到endFun

具体看代码 './kmp-state.js'

## 状态机应用场景？
1. week-01 红绿灯 TODO
