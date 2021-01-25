export function createElement(type, attributes, ...children) {
    let element;
    // 判断是否为原生标签
    if (typeof type === 'string') {
        element = new ElementWrapper(type);
    } else {
        element = new type;
    }

    // 设置属性
    for (let name in attributes) {
        element.setAttribute(name, attributes[name]);
    }

    let processChildren = (children) => {
        // 子节点
        for (let child of children) {
            if ((typeof child === 'object') && (child instanceof Array)) {
                // 子节点递归处理
                processChildren(child);
                continue;
            }
            if (typeof child === "string") {
                child = new TextWrapper(child);
            }

            element.appendChild(child);
        }
    }

    processChildren(children);


    return element;
}

export const STATE = Symbol('state');
export const ATTRIBUTES = Symbol('attributes');
export class Component {
    constructor() {
        // this.root = this.render();
        this[ATTRIBUTES] = Object.create(null);
        this[STATE] = Object.create(null);
    }
    setAttribute(name, value) {
        this[ATTRIBUTES][name] = value;
    }
    appendChild(child) {
        child.mountTo(this.root);
    }
    mountTo(parent) {
        if (!this.root) {
            this.render();
        }
        parent.appendChild(this.root);
    }
    triggerEvent(type, args) {
        // 触发自定义事件
        this[ATTRIBUTES]['on' + type.replace(/^[\s\S]/, v => v.toUpperCase(v))](
            new CustomEvent(type, {
                detail: args
            }))
    }
    render() {
        return this.root;
    }
}
class ElementWrapper extends Component {
    constructor(type) {
        super();
        this.root = document.createElement(type);
    }
    setAttribute(name, value) {
        this.root[name] = value;
    }
}

class TextWrapper extends Component {
    constructor(type) {
        super();
        this.root = document.createTextNode(type);
    }
}