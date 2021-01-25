// import { Carousel } from './carousel.js';
// import { createElement } from './framework.js';



// let d = [
//     {
//         img: 'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg',
//         url: 'www.baidu.con'
//     },
//     {
//         img: 'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg',
//         url: 'www.baidu.con'
//     },
//     {
//         img: 'https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg',
//         url: 'www.baidu.con'
//     },
//     {
//         img: 'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg',
//         url: 'www.baidu.con'
//     }    
    
// ];


// let a = < Carousel src = {d} onChange={e => console.log(e.detail)} onClick={e => window.location.href = e.detail.data.url}/>

// // document.body.appendChild(a);
// a.mountTo(document.body);

// Button content children
// import { createElement } from './framework.js';
// import { Button } from './Button.js';


// let a = <Button>
//     <div>1</div>
//     <div>2</div>
// </Button>
// a.mountTo(document.body);


// List template children
import { createElement } from './framework.js';
import { List } from './List.js';


let d = [
    {
        img: 'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg',
        label: 'www.baidu.con1'
    },
    {
        img: 'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg',
        label: 'www.baidu.con2'
    },
    {
        img: 'https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg',
        label: 'www.baidu.con3'
    },
    {
        img: 'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg',
        label: 'www.baidu.con4'
    }    
    
];

let a = <List data={d}>
    {
        record => 

        <div>
            <img src={record.img} />
            <span>{record.label}</span>
        </div>
        
    }
</List>
// let a = <Button>
//     <div>1</div>
//     <div>2</div>
// </Button>
a.mountTo(document.body);



