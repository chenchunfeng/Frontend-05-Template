
import { Component, STATE, ATTRIBUTES } from './framework.js';
import { enableGestrue } from './enable-gestrue.js';
import { Timeline, Animation } from './animation.js';
import { ease } from './timingfunction.js';
export { STATE, ATTRIBUTES } from './framework.js';



export class Carousel extends Component {
    constructor() {
        // this.root = document.createElement('div');
        super();
    }

    render() {
        this.root = document.createElement('div');
        this.root.classList.add('carousel');
        for (let record of this[ATTRIBUTES].src) {
            // 图片能拖动
            // let child = document.createElement('img');
            // child.src = record;
            let child = document.createElement('div');
            child.style.backgroundImage = `url('${record.img}')`;
            child.classList.add('img-box');

            this.root.appendChild(child);
        }
        let children = this.root.children;
        this[STATE].position = 0;  // 在可视区域的下标

        enableGestrue(this.root);
        // 添加动画时间线
        let timeline = new Timeline();
        let handler = null;
        let imgWidth = 500;    // px
        let animationDuration = 500;   // ms
        let timingFunc = ease;
        timeline.start();

        let t = 0; // 动画开始时间
        let ax = 0; // 动画移动的距离

        // 事件开始，暂停动画
        this.root.addEventListener('start', e => {
            timeline.pause();
            clearInterval(handler);
            let progress = (Date.now() - t) / animationDuration;
            ax = timingFunc(progress) * 500 + 500
        })

        // 触发点击事件
        this.root.addEventListener('tap', e => {
            this.triggerEvent('click', {
                data: this[ATTRIBUTES].src[this[STATE].position],
                position: this[STATE].position
            })
        })
        // 滑动
        this.root.addEventListener('pan', e => {
                let x = e.clientX - e.startX - ax;
                let current = this[STATE].position - ((x - x % imgWidth) / imgWidth);  // 一次可以划动好几张
                //  只需要处理 当前 前后 三张图片
                for(let offset of [-1, 0, 1]) {
                    // 把负数处成下标数, 偏移值 加 长度 再对其长度取余  current + offset 可能是len还大几倍，所以要先取余
                    let len = children.length;
                    let index = ((current + offset) % len + len) % len;
                    children[index].style.transition = 'none';
                    children[index].style.transform = `translateX(${ - index * imgWidth + offset * imgWidth + x % imgWidth}px)`;
                }
        })
        // 滑动结束
        this.root.addEventListener('end', e => {
            timeline.reset();
            timeline.start();

            handler = setInterval(nextPicture, 3000);  // 重新自动轮播


            let x = e.clientX - e.startX - ax;
            let current = this[STATE].position - ((x - x % imgWidth) / imgWidth);  // 一次可以划动好几张
            let direction = Math.round( x % imgWidth / imgWidth); // 左右方向
            // flick
            if (e.isFlick) {
                if (e.volicity < 0) {
                    direction = Math.ceil( x % imgWidth / imgWidth);
                } else {
                    direction = Math.floor( x % imgWidth / imgWidth);
                }
            }
            let len = children.length;

            //  只需要处理 当前 前后 三张图片
            for(let offset of [-1, 0, 1]) {
                // 把负数处成下标数, 偏移值 加 长度 再对其长度取余  current + offset 可能是len还大几倍，所以要先取余
                let index = ((current + offset) % len + len) % len;
                timeline.add(new Animation({
                    object: children[index].style,
                    property: 'transform',
                    timingFunc: timingFunc,
                    template: v => `translateX(${v}px)`,
                    startValue: (-index + offset) * imgWidth + x % 500,
                    endValue:  (-index + offset + direction) * imgWidth,
                    duration: animationDuration
                }))
            }
            //保存当前position位置
            this[STATE].position = this[STATE].position - (x - x % 500) / 500 - direction;
            // 可能出现负数  x拖了几个位置
            this[STATE].position = (this[STATE].position % len + len) % len;
            
            this.triggerEvent('change', this[STATE]);

        })

        // 自动轮播
        let nextPicture = () => {
            // 记录动画开始时间
            t = Date.now();
            let nextIndex  = (this[STATE].position + 1) % children.length;

            let current = children[this[STATE].position];
            let next = children[nextIndex];

            timeline.add(new Animation({
                object: current.style,   // 注意这里的对象是.style
                property: 'transform',
                startValue: - this[STATE].position * imgWidth,  
                endValue: - imgWidth - this[STATE].position * imgWidth,
                duration: animationDuration,
                delay: 0,
                timingFunc: timingFunc,
                template: v => `translateX(${v}px)`         
            }))
            timeline.add(new Animation({
                object: next.style,
                property: 'transform',
                startValue: imgWidth - nextIndex * imgWidth,
                endValue: - nextIndex * imgWidth,
                duration: animationDuration,
                delay: 0,
                timingFunc: timingFunc,
                template: v => `translateX(${v}px)`         
            }))

            this[STATE].position = nextIndex;
            this.triggerEvent('change', this[STATE]);

        };
        // 在timeline上添加当前页，和下一页的动画
        handler = setInterval(nextPicture, 3000);

        return this.root;
    }

}