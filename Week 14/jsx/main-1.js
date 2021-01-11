
function createElement(type, attributes, ...children) {
    let element = document.createElement(type);
    // 设置属性
    for(let name in attributes) {
        element.setAttribute(name, attributes[name]);
    }
    // 子节点
    for(let child of children) {
        if(typeof child === "string") {
            child = document.createTextNode(child)
        }

        element.appendChild(child);
    }

    return element;
}
let a = <div id="a">
        <span>a</span>
        <span>b</span>
        <span>c</span>
    </div>

document.body.appendChild(a);