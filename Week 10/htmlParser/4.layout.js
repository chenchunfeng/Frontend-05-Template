// 清除px、把数值字符串转number类型
function getStyle(element) {
    if (!element.style) {
        element.style = {}
    }
    // 把计算后的属性挂在style上
    for(let prop in element.computedStyle) {
        let p = element.computedStyle.value;
        element.style[prop] = element.computedStyle[prop].value;

        if (element.style[prop].toString().match(/px$/)) {
            element.style[prop] = parseInt(element.style[prop]);
        }
        if (element.style[prop].toString().match(/^[0-9\.]+$/)) {
            element.style[prop] = parseInt(element.style[prop]);
        }

    }

    return element.style;
}

function layout(element) {
    // 没样式，当然不需要layout
    if (element.computedStyle) {
        return ;
    }
    // 处理px 数字转字符串
    let elementStyle = getStyle(element);

    // 现只处理 flex 布局的
    if (elementStyle.display !== 'flex') {
        return ;
    }

    // 过滤元素
    let items = element.children.filter(e => e.type === 'element');

    // 根据item 的order 进行排序  order的默认值为0
    item.sort((a, b) => {
        return (a.order || 0) - (b.order || 0);
    })

    let style = elementStyle;

    // 设置默认值
    ['width', 'height'].forEach(size => {
        if (style[size] === 'auto' || style[size] === '') {
            style[size] = null;
        }
    })

    // 主轴方向
    if (!style.flexDirection || style.flexDirection === 'auto') {
        style.flexDirection = 'row';
    }
    // 交叉轴对齐方式
    if (!style.alignItems || style.alignItems === 'auto') {
        style.alignItems = 'stretch';
    }
    // 主轴对齐方式
    if (!style.justifyContent || style.justifyContent === 'auto') {
        style.justifyContent = 'flex-start';
    }
    // 换行
    if (!style.flexWrap || style.flexWrap === 'auto') {
        style.flexWrap = 'nowrap';
    }
    // 多轴线 交叉轴对齐方式
    if (!style.alignContent || style.alignContent === 'auto') {
        style.alignContent = 'row';
    }

    //
    let mainSize, mainStart, mainEnd, mainSign, mainBase,
        crossSize, crossStart, crossEnd, crossSign, crossBase;
    
    if (style.flexDirection === 'row') {
        mainSize = 'width';
        mainStart = 'left';
        mainEnd = 'right';
        // +1 这里是要跟base 配对的， 从左到右
        mainSign = +1;
        mainBase = 0;

        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom';
    }

    if (style.flexDirection === 'row-reverse') {
        mainSize = 'width';
        mainStart = 'right';
        mainEnd = 'left';
        // -1 这里是要跟base 配对的， 从右到左
        mainSign = -1;
        mainBase = mainSize;

        crossSize = 'height';
        crossStart = 'top';
        crossEnd = style.width;
    }
    if (style.flexDirection === 'column') {
        mainSize = 'height';
        mainStart = 'top';
        mainEnd = 'bottom';
        // +1 这里是要跟base 配对的，  从上到下
        mainSign = +1;
        mainBase = 0;

        crossSize = 'width';
        crossStart = 'left';
        crossEnd = 'right';
    }
    if (style.flexDirection === 'column-reverse') {
        mainSize = 'height';
        mainStart = 'bottom';
        mainEnd = 'top';
        // +1 这里是要跟base 配对的， 从下到上
        mainSign = -1;
        mainBase = style.height;

        crossSize = 'width';
        crossStart = 'left';
        crossEnd = 'right';
    }

    // 反向换行，就是第二行在第一行上面
    if (style.flexWrap === 'wrap-reverse') {
        // 对调位置
        [crossStart, crossEnd] = [crossEnd, crossStart];
        crossSign = -1;
    } else {
        crossSign = +1;
        crossBase = 0;
    }

    // 主轴是否定义了尺寸
    let isAutoMainSize = false;
    // 没有主轴size，就要靠其项目撑开
    if (!style[mainSize]) {
        elementStyle[mainSize] = 0;
        for(let i=0; i < items.length; i++) {
            let item = items[i];
            let itemStyle = getStyle(item);
            // 总宽度由子项目累加
            if (itemStyle[mainSize] !== null || itemStyle[mainSize] !== 'auto' || itemStyle[mainSize] !== (void 0)) {
                elementStyle[mainSize] += itemStyle[mainSize];
            }
        }
        isAutoMainSize = true;
    }

    // 元素分行
    let flexLine = [];
    // 忽略了这里，常规思维是第一行满了再push进去。由于一有伸缩，不换行的属性，直接把第一个放进去了
    let flexLines = [flexLine];

    let mainSpace = elementStyle[mainSize];
    let crossSpace = 0;

    for( let i=0; i < item.length; i++) {
        let item = items[i];
        let itemStyle = getStyle(item);

        if (itemStyle[mainSize] === null) {
            itemStyle[mainSize] = 0;
        }

        if (itemStyle.flex) {
            // 可伸缩
            flexLine.push(item);
        } else if (style.flexWrap === 'nowrap' && isAutoMainSize) {
            mainSpace -= itemStyle[mainSize];
            if (itemStyle[crossSize] !== null && itemStyle[crossSize] != (void 0)) {
                // 最高的元素撑开行高
                crossSpace = Math.max(crossSpace, item,itemStyle[crossSize]);
            }
            flexLine.push(item);
        } else {
            // 换行的情况

            // 有些元素很大，就把他压成跟主轴一样大
            if (itemStyle[mainSize] > style[mainSize]) {
                 itemStyle[mainSize] = style[mainSize];
            }

            if (mainSpace < itemStyle[mainSize]) {
                // 换行
                flexLine.mainSpace = mainSpace;
                flexLine.crossSpace = crossSpace;
                
                // 新一行的数据
                flexLines.push(flexLine);
                flexLine = [item];
                mainSpace = style[mainSize];
                crossSpace = 0;
            } else {
                // 未换行
                flexLine.push(item);
            }

            if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) {
                // 最高的元素撑开行高
                crossSpace = Math.max(crossSpace, item,itemStyle[crossSize]);
            }
            mainSpace -= itemStyle[mainSize];


        }
    }
    // 最后一行的剩余空间
    flexLine.mainSpace = mainSpace;

    // 计算主轴上元素位置

    if (style.flexWrap === 'nowrap' || isAutoMainSize) {
        flexLine.crossSpace = (style[crossSize] !== (void 0)) ? style[crossSize] : crossSpace;
    } else {
        flexLine.crossSpace = crossSpace;
    }

    if (mainSpace < 0) {
        // 单行逻辑 需要等比压缩
        let scale = style[mainSize] / (style[mainSize] - mainSpace);
        let currentMain = mainBase;

        for(let i = 0; i <items.length; i++) {
            let item = item[i];
            let itemStyle = getStyle(item);

            if (itemStyle.flex) {
                itemStyle[mainSize] = 0;
            }

            itemStyle[mainSize] = itemStyle[mainSize] * scale;

            itemStyle[mainStart] = currentMain;
            // mainSign +1 -1
            itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
            // 下一个元素开始的位置 = 上一个结束的位置
            currentMain = itemStyle[mainEnd];
        }

    } else {
        // 多行
        flexLines.forEach(items => {
            let mainSpace = item.mainSpace;
            let flexTotal = 0;
            // 记录flex总数
            for(let i = 0; i <items.length; i++) {
                let item = item[i];
                let itemStyle = getStyle(item);
                
                if (itemStyle.flex !== null && itemStyle.flex !== (void 0)) {
                    flexTotal += itemStyle.flex;
                    continue;
                }
            }
            // 按flex-grow 分配剩余空间
            if (flexTotal > 0) {
                let currentMain = mainBase;

                for(let i = 0; i <items.length; i++) {
                    let item = item[i];
                    let itemStyle = getStyle(item);

                    if (itemStyle.flex) {
                        itemStyle[mainSize] = mainSpace * (itemStyle.flex / flexTotal);
                    }

                    itemStyle[mainStart] = currentMain;
                    // mainSign +1 -1
                    itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
                    // 下一个元素开始的位置 = 上一个结束的位置
                    currentMain = itemStyle[mainEnd];
                }
            } else {
                let currentMain, step;

                if (style.justifyContent === 'flex-start') {
                    currentMain = mainBase;  // 元素初始位置
                    step = 0; // 元素之间的间隔
                }
                if (style.justifyContent === 'flex-end') {
                    currentMain = mainBase + mainSpace * mainSign;
                    step = 0;
                }
                if (style.justifyContent === 'center') {
                    currentMain = mainBase + mainSpace / 2;
                    step = 0;
                }
                if (style.justifyContent === 'space-between') {
                    currentMain = mainBase;
                    step = mainSpace / (items.length - 1) * mainSign;
                }
                if (style.justifyContent === 'space-around') {
                    step = mainSpace / items.length * mainSign;; 
                    currentMain = step / 2 + mainBase;
                    
                }

                for(let i = 0; i <items.length; i++) {
                    let item = item[i];
                    let itemStyle = getStyle(item);

                    itemStyle[mainStart] = currentMain;
                    // mainSign +1 -1  
                    itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
                    // 下一个元素开始的位置 = 上一个结束的位置 + 加间隔
                    currentMain = itemStyle[mainEnd] + step;
                }
            }
        })
    }


    // 计算交叉轴的位置
    let crossSpace;

    if (!style[crossSize]) {
        crossSpace = 0;
        elementStyle[crossSize] = 0;
        // 每行的高度累加 都为每行的最高的元素，没有空间分配
        for(let i = 0; i < flexLines.length; i++) {
            elementStyle[crossSize] += flexLines[i][crossSpace];
        }
    } else {
        crossSpace = style[crossSize];
        // 求剩余交叉轴剩余空间
        for(let i = 0; i < flexLines.length; i++) {
            crossSpace -= flexLines[i][crossSpace];
        }
    }

    if (style.flexWrap === 'wrap-reverse') {
        crossBase = style[crossSize];
    } else {
        crossBase = 0;
    }

    // ??
    let lineSize = style[crossSize] / flexLines.length;

    // 整体
    let step;
    if (style.alignContent === 'flex-start') {
        crossBase = 0;  // 元素初始位置
        step = 0; // 元素之间的间隔
    }
    if (style.justifyContent === 'flex-end') {
        crossBase = crossBase + crossSpace * crossSign;
        step = 0;
    }
    if (style.justifyContent === 'center') {
        crossBase = crossBase + crossSpace / 2 * crossSign;
        step = 0;
    }
    if (style.justifyContent === 'space-between') {
        crossBase = 0;
        step = crossSpace / (flexLines.length - 1) * crossSign;
    }
    if (style.justifyContent === 'space-around') {
        step = crossSpace / flexLines.length * crossSign; 
        crossBase = step / 2 + crossBase;
    }

    if (style.justifyContent === 'stretch') {
        step = 0; 
        crossBase = 0;
    }
    // 遍历每一行里面的的元素
    flexLines.forEach(items => {
        // 每行的高度
        let lineCrossLize = style.alignContent === 'stretch' ? items.crossSpace + crossSpace / flexLines.length : item.crossSpace;
        for(let i = 0; i <items.length; i++) {
            let item = item[i];
            let itemStyle = getStyle(item);
            
            let align = itemStyle.alignSelf || itemStyle.alignItems;
            if (item == null) {
                itemStyle[crossSize] = align === 'stretch' ? lineCrossLize : 0;
            }

            // 每个元素在行高中的位置
            if (align === 'flex-start') {
                itemStyle[crossStart] = crossBase;
                itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[corssSize];
            }
            if (align === 'flex-end') {
                //
                itemStyle[crossEnd] = crossBase + crossSign * lineCrossLize;
                itemStyle[crossStart] = itemStyle[crossEnd] - crossSign * itemStyle[corssSize];
            }
            if (align === 'center') {
                itemStyle[crossStart] = crossBase + crossSign * (lineCrossLize - itemStyle[crossSize]) / 2;
                itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[corssSize];
            }
            if (align === 'stretch') {
                itemStyle[crossStart] = crossBase;
                itemStyle[crossEnd] = crossBase * crossSign * (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) ? itemStyle[crossSize] : lineCrossLize;

                itemStyle[crossSize] = crossSign * (itemStyle[crossEnd] - itemStyle[crossStart]);
            }

        }
        crossBase = crossBase + (step + lineCrossLize) * crossSign;
    })









}

module.exports = layout;