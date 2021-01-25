
const TICK = Symbol('tick');
const TICK_HANDLER = Symbol('tick-handler');
const ANIMATION = Symbol('animmation');
const START_TIME = Symbol('start-time');
const PAUSE_START = Symbol('pause-start');
const PAUSE_TIME = Symbol('pause-time');


export class Timeline {
    constructor() {
        this[ANIMATION] = new Set();
        this[START_TIME] = new Map();
        this[PAUSE_TIME] = 0;
        this.state = 'inited';
    }

    start() {
        if (this.state !== 'inited') {
            return ;
        }
        this.state = 'started';
        let startTime = Date.now();
        // 因为要传入开始时间，tick函数改在这里定义
        this[TICK] = () => {
            let now = Date.now();
            // 循环传入的animation
            for(let animation of this[ANIMATION]) {
                let t;
                if(this[START_TIME].get(animation) < startTime) {
                    // 时间线开始时间在anition添加时间之后
                    t = now - startTime;
                } else  {
                    // 时间线开始时间在anition添加时间之前
                    t = now - this[START_TIME].get(animation);
                }
                // 暂停时间
                t -= this[PAUSE_TIME];
                // 延迟时间
                t -= animation.delay;
                // 判断到达持续时间
                if (animation.duration < t) {
                    this.remove(animation);
                    // 强制把t 设为持续时间, 处理时间超出问题
                    // 为什么超出 16.66666ms一帧 总会有小数的
                    t = animation.duration;
                }
                // t 可能出现负数
                if (t > 0) {
                    animation.receiveTime(t);
                }
            }
            this[TICK_HANDLER] = requestAnimationFrame(this[TICK]);
        }
        this[TICK]();
    }
    pause() {
        if (this.state !== 'started') {
            return ;
        }
        this.state = 'paused';
        this[PAUSE_START] = Date.now();
        cancelAnimationFrame(this[TICK_HANDLER]);
    }
    resume() {
        if (this.state !== 'paused') {
            return ;
        }
        this.state = 'started';
        this[PAUSE_TIME] += Date.now() - this[PAUSE_START];
        this[TICK]();
    }
    reset() {
        this.state = 'inited';
        this.pause();
        this[PAUSE_TIME] = 0;
        this[PAUSE_START] = 0;
        this[TICK_HANDLER] = null;
        this[ANIMATION] = new Set();
        this[START_TIME] = new Map();
        // this.start();
    }
    add(animation, startTime = Date.now()) {
        this[ANIMATION].add(animation);
        this[START_TIME].set(animation, startTime)
    }
    remove(animation) {
        this[ANIMATION].delete(animation);

    }
}


export  class Animation {
    constructor(option) {
        let {object, property, startValue, endValue, duration, delay, timingFunc, template} = option;

        this.object = object;
        this.property = property;
        this.startValue = startValue;
        this.endValue = endValue;
        this.duration = duration;
        this.delay = delay || 0;
        this.timingFunc = timingFunc || (v => v);
        this.template = template || (v => v);        
    }

    receiveTime(time) {
        // console.log(time);
        let range = this.endValue - this.startValue;
        let progress = this.timingFunc(time / this.duration);   // 0 - 1 之间
        // console.log(progress);
        this.object[this.property] = this.template(this.startValue + range * progress);
    }
}