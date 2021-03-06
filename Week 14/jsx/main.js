
function createElement(type, attributes, ...children) {
    let element;
    // 判断是否为原生标签
    if(typeof type === 'string') {
        element = new ElementWrapper(type);
    }else{
        element = new type;
    }

    // 设置属性
    for(let name in attributes) {
        element.setAttribute(name, attributes[name]);
    }
    // 子节点
    for(let child of children) {
        if(typeof child === "string") {
            child = new TextWrapper(child);
        }

        element.appendChild(child);
    }

    return element;
}

class MyComponent {
    constructor() {
        this.root = document.createElement('div');
    }
    setAttribute(name, value) {
        this.root.setAttribute(name, value);
    }
    appendChild(child) {
        child.mountTo(this.root);
    }
    mountTo(parent) {
        parent.appendChild(this.root);
    }
}

class ElementWrapper {
    constructor(type) {
        this.root = document.createElement(type);
    }
    setAttribute(name, value) {
        this.root.setAttribute(name, value);
    }
    appendChild(child) {
        child.mountTo(this.root);
    }
    mountTo(parent) {
        parent.appendChild(this.root);
    }
}

class TextWrapper {
    constructor(type) {
        this.root = document.createTextNode(type);
    }
    setAttribute(name, value) {
        this.root.setAttribute(name, value);
    }
    appendChild(child) {
        child.mountTo(this.root);
    }
    mountTo(parent) {
        parent.appendChild(this.root);
    }
}
let a = <MyComponent id="a">
        <span>1</span>
        <span>2</span>
        <span>3</span>
    </MyComponent>

// document.body.appendChild(a);
a.mountTo(document.body);