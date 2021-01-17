
import { Component } from './framework.js';

export class Carousel extends Component {
    constructor() {
        // this.root = document.createElement('div');
        super();
        this.attributes = Object.create(null);
    }
    setAttribute(name, value) {
        this.attributes[name] = value;
    }
    render() {
        this.root = document.createElement('div');
        this.root.classList.add('carousel');
        for (let record of this.attributes.src) {
            // 图片能拖动
            // let child = document.createElement('img');
            // child.src = record;
            let child = document.createElement('div');
            child.style.backgroundImage = `url('${record}')`;
            child.classList.add('img-box');

            this.root.appendChild(child);
        }

        // 自动轮播
        // let currentIndex = 0;
        // setInterval(() => {
        //     let children = this.root.children;
        //     let nextIndex  = (currentIndex + 1) % children.length;

        //     let current = children[currentIndex];
        //     let next = children[nextIndex];

        //     // 下一个元素不需要动画
        //     next.style.transition = 'none';
        //     // 调整下一个元素位置
        //     next.style.transform = `translateX(${100 - nextIndex * 100}%)`;
        //     // 调整当前帧位置
        //     setTimeout(() => {
        //         current.style.transform = `translateX(${-100 - currentIndex * 100}%)`;

        //         next.style.transition = '';
        //         next.style.transform = `translateX(${-nextIndex * 100}%)`;
        //         currentIndex = nextIndex;

        //     }, 16);

        // }, 3000);

        // 鼠标拖拽
        let position = 0;  // 在可视区域的下标
        let x = 0; // 拖拽的位置   是否左右移动x决定  position不需要取负值 
        this.root.addEventListener('mousedown', e => {
            let startX = e.clientX;
            let children = this.root.children;

            let move = e => {
                //clienY clienX 在可视区域的位置
                x = e.clientX - startX;

                //  只需要处理 当前 前后 三张图片
                for(let offset of [-1, 0, 1]) {
                    // 把负数处成下标数, 偏移值 加 长度 再对其长度取余
                    let index = (offset + children.length + position) % children.length;
                    children[index].style.transition = 'none';
                    children[index].style.transform = `translateX(${(-index + offset )* 500  + x}px)`;
                }

            }
            let up = e => {
                // 记录位置
                position = position - Math.round( x / 500); // 每张图宽500
                //  只需要处理 x 如果大于零 右滑
                for(let offset of [0, - Math.sign(Math.round(x / 500) - x + 250 * Math.sign(x))]) {
                    // 把负数处成下标数, 偏移值 加 长度 再对其长度取余
                    let index = (position +  offset + children.length) % children.length;
                    console.log(index);
                    children[index].style.transition = '';
                    children[index].style.transform = `translateX(${(-index + offset )* 500}px)`;
                }
                document.removeEventListener('mouseup', up);
                document.removeEventListener('mousemove', move);
            }

            document.addEventListener('mousemove', move); 
            document.addEventListener('mouseup', up);
        })

        return this.root;
    }
    mountTo(parent) {
        parent.appendChild(this.render());
    }
}