import {foo2} from './foo2.js';
var x = 2;
export default function foo() {
    console.log(x);
    foo2();
    console.log(x);
};