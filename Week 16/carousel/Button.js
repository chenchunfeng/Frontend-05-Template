import { Component, STATE, ATTRIBUTES, createElement } from './framework.js';
import { enableGestrue } from './enable-gestrue.js';

export { STATE, ATTRIBUTES } from './framework.js';

export class Button extends Component {
    constructor() {
        super();
    }

    render() {
        this.childContainer = <span />;
        this.root = (<div>{this.childContainer}</div>).render();
        return this.root;
    }
    appendChild(child) {
        if (!this.childContainer) {
            this.render()
        }

        this.childContainer.appendChild(child);
    }
}