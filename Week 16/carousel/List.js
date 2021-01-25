import { Component, STATE, ATTRIBUTES, createElement } from './framework.js';
import { enableGestrue } from './enable-gestrue.js';

export { STATE, ATTRIBUTES } from './framework.js';

export class List extends Component {
    constructor() {
        super();
    }

    render() {
        let content = this[ATTRIBUTES].data.map(this.template);
        console.log(content);
        this.root = (<div>{content}</div>).render();
        return this.root;
    }
    appendChild(child) {
        this.template = child;
        this.render();
    }
}