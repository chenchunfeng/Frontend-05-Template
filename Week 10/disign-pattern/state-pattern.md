## 状态模式

先来看一个例子，一个按钮控制电灯 开 或 关
```javascript
    class Light {
        constructor() {
            this.state = 'on';
            this.button = null;
        }
        // 创建开关，并绑定点击事件
        init() {
            let button = document.createElement('button');
            button.innerText = '开关';
            this.button = document.body.appendChild(button);
            this.button.onclick = () => {
                this.buttonWasPressed();
            }
        }

        buttonWasPressed() {
            if(this.state === 'on') {
                console.log('开灯');
                this.state = 'off';
            } else {
                console.log('关灯');
                this.state = 'on';
            }
        }
    }

    new Light().init();
```

在这个例子实现了要求了功能，
- 但有一天需求要添加一个中间状态，我们就必须修改buttonWasPressed函数，在里继续添加if else，这明显违反开放-封闭原（对外开放功能，但不能修改我的代码）
- 假设状态继续增加的话，也不利于代码阅读


### 状态模式的定义：
> 允许一个对象在其内部状态改变时改变它的行为，对象看起来似乎修改了它的类。
- 把状态封装成独立的类
- 当状态切换时，委托状态类修改行为 

开始改造粟子

状态 关->弱光->强光->关

```javascript
    class State {
        constructor(light) {
            this.light = light;
        }

        buttonWasPressed() {
            throw Error('小兄弟，记得定义下状态类里面的行为方法');
        }

    }
    // 状态 关
    class StateOff extends State {
        constructor(light) {
            super(light);
        }

        buttonWasPressed() {
            console.log('弱光');
            this.light.currentState = 'StateWeak';
        }
    }
    // 状态 弱
    class StateWeak extends State {
        constructor(light) {
            super(light);
        }

        buttonWasPressed() {
            console.log('强光');
            this.light.currentState = 'StateStrong';
        }
    }
    // 状态 强
    class StateStrong extends State {
        constructor(light) {
            super(light);
        }

        buttonWasPressed() {
            console.log('关');
            this.light.currentState = 'StateOff';
        }
    }

    // 改写原有light类 
    class Light {
        constructor() {
            this.currentState = 'StateOff';
            this.button = null;

            // 三个状态
            this.StateOff = new StateOff(this);
            this.StateWeak = new StateWeak(this);
            this.StateStrong = new StateStrong(this);
        }
        // 创建开关，并绑定点击事件
        init() {
            let button = document.createElement('button');
            button.innerText = '开关';
            this.button = document.body.appendChild(button);
            this.button.onclick = () => {
                // 调用状态类里面的行为
                this[this.currentState].buttonWasPressed();
            }
        }
    }

    new Light().init();
```

### 状态与策略的区别

状态：状态的关系封装在内部，把下一步都已经决定了

### 有限状态机 finite state machine 

状态机是一种数学模型 ，状态模式

模型 ？ 模式 ？

> 状态模式是由状态机模型来实现的

如果使用状态机，怎样写这个代码？
let's go

```javascript
    class Light {
        constructor() {
            this.state = FSM.offState;
            this.button = null;
        }
        // 创建开关，并绑定点击事件
        init() {
            let button = document.createElement('button');
            button.innerText = '点我开灯';
            this.button = document.body.appendChild(button);
            this.button.onclick = () => {
                this.state();
            }
        }
    }
    // 注意不要使用箭头函数了，要不然fsm的this就是window
    let FSM = {
        offState: function() {
            console.log('弱');
            this.button.innerText = '点我超级亮';
            this.state = FSM.weakState;

        },
        weakState:  function() {
            console.log('强');
            this.button.innerText = '点我关灯';
            this.state = FSM.strongState;
        },
        strongState: function() {
            console.log('关');
            this.button.innerText = '点我开灯';
            this.state = FSM.offState;
        } 
    }

    new Light().init();

```

经典红绿灯demo，先分析下需求

- 状态集: 红 绿 黄
- 确定初始状态：假设 是红灯
- 状态转移函数：延时及调度
- 最终状态： 可以继续循环，还是一轮就结束

```javascript
    class TrafficLight {
        constructor() {
            this.button = null;
            this.startSate = this.red;
        }
        init() {
            let button = document.createElement('button');
            button.innerText = 'start';
            this.button = document.body.appendChild(button);
            this.button.onclick = () => {
                this.transition();
            }
        }
        transition() {
            this.startSate();
        }
        activeLight(className) {
            let lights = document.getElementsByClassName('light');
            [].forEach.call(lights, el => {
                el.classList.remove('active');
            })
            document.getElementsByClassName(className)[0].classList.add('active')
        }
        // 直接把fsm写进来类里面 每一个函数里面都有延时及下一个的调度
        red() {
            this.activeLight('red');
            setTimeout(() => {
                this.green();
            }, 2000);
        }
        green() {
            this.activeLight('green');
            setTimeout(() => {
                this.yellow();
            }, 1000);
        }
        yellow() {
            this.activeLight('yellow');
            setTimeout(() => {
                this.red();
            }, 1000);
        }
    }
```

### 有限状态机 实现 promise 

// TODO
