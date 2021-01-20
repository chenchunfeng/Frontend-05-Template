export class Listener {
    constructor(element, recognize) {
        let contexts = new Map();
        let isListeningMouse = false;

        element.addEventListener('mousedown', (e) => {
            let context = Object.create(null);
            // 移位才能对应mousemove.buttons的值
            contexts.set('mouse' + (1 << e.button), context);
            recognize.start(e, context);
            // console.log('mousedown', e);
            let mousemove = (e) => {
                // console.log('mousemove', e);
                let button = 1;
                while (button <= e.buttons) {
                    if (button & e.buttons) {
                        let key = button;
                        // 中间与右键相反
                        if (button === 2) {
                            key = 4;
                        }
                        if (button === 4) {
                            key = 2;
                        }

                        let context = contexts.get('mouse' + key);
                        recognize.move(e, context);
                    }

                    button = button << 1;

                }

            }
            let mouseup = (e) => {
                // console.log('mouseup', e);
                let context = contexts.get('mouse' + (1 << e.button));
                recognize.end(e, context);
                contexts.delete('mouse' + (1 << e.button));
                // 没有按键按下
                if (e.buttons === 0) {
                    document.removeEventListener('mousemove', mousemove);
                    document.removeEventListener('mouseup', mouseup);
                    isListeningMouse = false;
                }
            }
            // 只监听一次就够            
            if (!isListeningMouse) {
                document.addEventListener('mousemove', mousemove);
                document.addEventListener('mouseup', mouseup);
                isListeningMouse = true;
            }

        })

        element.addEventListener('touchstart', e => {
            for (let touch of e.changedTouches) {
                // 创建context传入 并以identifier做key保存，在move end 中使用
                let context = Object.create(null);
                contexts.set(touch.identifier, context);
                recognize.start(touch, context);
            }
        })
        element.addEventListener('touchmove', e => {
            for (let touch of e.changedTouches) {
                recognize.move(touch, contexts.get(touch.identifier));
            }
        })
        element.addEventListener('touchend', e => {
            for (let touch of e.changedTouches) {
                recognize.end(touch, contexts.get(touch.identifier));
                // 恢复默认, 要不然就再点状态就错了
                contexts.delete(contexts.get(touch.identifier));
            }
        })
        element.addEventListener('touchcancel', e => {
            for (let touch of e.changedTouches) {
                recognize.cancel(touch, contexts.get(touch.identifier));
                contexts.delete(contexts.get(touch.identifier));
            }
        })
    }
}
export class Recognizer {
    constructor(dispatcher) {
        this.dispatcher = dispatcher;
    }
    // let handler, startX, startY;
    // // 默认为tap
    // let isPan = false, isPress = false; isTap = true;
    start(point, context) {
        // 初始化
        context.isPan = false;
        context.isTap = true;
        context.isPress = false;
        // flick: 收集点，用于计算移动速度
        context.points = [{
            t: Date.now(),
            x: point.clientX,
            y: point.clientY
        }];


        // 1. 500ms 无其它操作则为长按press
        context.handler = setTimeout(() => {
            context.isPan = false;
            context.isTap = false;
            context.isPress = true;
            context.handler = null
            // console.log('press');
            this.dispatcher.dispatch('press', {});
        }, 500);
        // 2. 保存startX startY 计算移动距离使用
        context.startX = point.clientX;
        context.startY = point.clientY;
    }
    move(point, context) {
        // 3. 计算距离是否大于10px 为了省开方 直接用100比较  
        let dx = point.clientX - context.startX;
        let dy = point.clientY - context.startY;
        // 移动可能是来回移动的，标识后pan不需要再判断
        if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
            context.isPan = true;
            context.isTap = false;
            context.isPress = false;
            context.isVertical = Math.abs(dx) < Math.abs(dy); // 是否上下滑
            clearTimeout(context.handler);
            // console.log('panstart');
            this.dispatcher.dispatch('panstart', {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: context.isVertical, 
            });

        }
        if (context.isPan) {
            console.log('pan');
        }
        // console.log('move', point);
        // flick 精化部分 只保留500ms内移动的点
        // 刚开始还在思考来回移动时的速度很快，但计算出来的速度就慢问题。但从业务角度考虑，来回划，是不会触发flick才对
        context.points = context.points.filter(point => Date.now() - point.t < 500);
        context.points.push({
            t: Date.now(),
            x: point.clientX,
            y: point.clientY
        });
    }
    end(point, context) {
        // console.log('end', point);
        if (context.isTap) {
            // console.log('tap');
            this.dispatcher.dispatch('tap', {});
            clearTimeout(context.handler);
        }

        if (context.isPress) {
            // console.log('pressend');
            this.dispatcher.dispatch('pressend', {});
        }

        // flick 最后计算速度
        context.points = context.points.filter(point => Date.now() - point.t < 500);
        let v;
        if (context.points.length === 0) {
            v = 0;
        } else {
            let d = Math.sqrt((point.clientX - context.points[0].x) ** 2 + (point.clientY - context.points[0].y) ** 2);
            v = d / (Date.now() - context.points[0].t);
        }

        if (v > 1.5) {
            // 1.5 像素每毫秒
            // console.log('flick');
            context.isFlick = true;
            this.dispatcher.dispatch('flick', {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: context.isVertical,
                isFlick: context.flick,
                velocity: v
            });
        } else {
            context.isFlick = false;
        }
        // console.log(v);
        if (context.isPan) {
            // console.log('panend');
            this.dispatcher.dispatch('panend', {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: context.isVertical, 
                isFlick: context.isFlick
            });
        }
    }
    cnacel(point, context) {
        clearTimeout(context.handler);
        // console.log('cnacel', point);
        this.dispatcher.dispatch('cnacel', {});
        
    }


}

export class Dispatcher {
    constructor(element) {
        this.element = element;
    }

    dispatch(type, properties) {
        let event = new Event(type);
        for(let name in properties) {
            event[name] = properties[name];
        }
        this.element.dispatchEvent(event);
    }
}
export function enableGestrue(element) {
    new Listener(element,new Recognizer(new Dispatcher(element)));
}