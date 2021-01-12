import {
    createElement,
    Component
} from './framework.js';
console.log('1234567');
class Carousel extends Component {
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
                // for(let child of children) {
                //     child.style.transition = 'none';
                //     child.style.transform = `translateX(${position * 500 + x}px)`;
                // }

                //  只需要处理 当前 前后 三张图片
                for(let offset of [-1, 0, 1]) {
                    // 把负数处成下标数, 偏移值 加 长度 再对其长度取余
                    let index = (offset + children.length) % children.length;
                    children[index].style.transition = 'none';
                    children[index].style.transform = `translateX(${- position * 500 * offset + x}px)`;
                } 

            }
            let up = e => {
                // 记录位置
                position = position + Math.round( x / 500); // 每张图宽500
                // for(let child of children) {
                //     //恢复动画
                //     child.style.transition = '';
                //     child.style.transform = `translateX(${position * 500}px)`;
                // }
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

let d = [
    'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg',
    'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg',
    'https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg',
    'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg'
];


let a = < Carousel src = {
    d
}
/>

// document.body.appendChild(a);
a.mountTo(document.body);