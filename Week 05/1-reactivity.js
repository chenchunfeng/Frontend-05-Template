

let obj = {
    a: 'bbq',
    b: {c:2}
};
let callbacks = new Map();    // 全局记录effect的回调
let reactivties = new Map();
let usedReactivties = [];    // 全局记录监听的对象及其属性

let po = reactive(obj);

effect(() => {
    console.log(po.b.c);
})




function effect(callback) {
    usedReactivties = [];
    callback();
    // 按对象及其对应的属性来保存callback
    for(let reactivity of usedReactivties) {
        // reactivity = [obj, prop]  处理边缘case
        if(!callbacks.has(reactivity[0])) {
            callbacks.set(reactivity[0], new Map());
        }
        if(!callbacks.get(reactivity[0]).has(reactivity[1])) {
            callbacks.get(reactivity[0]).set(reactivity[1], []);
        }
        callbacks.get(reactivity[0]).get(reactivity[1]).push(callback);
    }
}

function reactive(object) {
    if(reactivties.has(object)) {
        return reactivties.get(object);
    }
    let proxy = new Proxy(object, {
        get(obj, prop) {
            usedReactivties.push([obj, prop]); // 收集调用的对象及属性
            if(typeof obj[prop] === 'object') {
                return reactive(obj[prop]);
            }
            return obj[prop];
        },
        set(obj, prop, value) {
            obj[prop] = value;
            // 按 [obj, prop]来执行所对应callback
            if(callbacks.get(obj) && callbacks.get(obj).get(prop)) {
                for(let callback of callbacks.get(obj).get(prop)) {
                    callback();
                }
            }
            return obj[prop];
        }
    })
    reactivties.set(object, proxy);
    return proxy;


}