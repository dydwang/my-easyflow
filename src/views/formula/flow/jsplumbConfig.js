export const jsplumbSetting = {
    // 动态锚点、位置自适应
    Anchors: ['Top', 'TopCenter', 'TopRight', 'TopLeft', 'Right', 'RightMiddle', 'Bottom', 'BottomCenter', 'BottomRight', 'BottomLeft', 'Left', 'LeftMiddle'],
    // 容器ID
    Container: 'efContainer',
    // 连线的样式，直线或者曲线等，可选值:  StateMachine、Flowchart，Bezier、Straight
    // Connector: ['Bezier', {curviness: 20}],
    Connector: ['Straight', {stub: 20, gap: 1}],
    // Connector: ['Flowchart', {stub: 30, gap: 1, alwaysRespectStubs: false, midpoint: 0.5, cornerRadius: 10}],
    // Connector: ['StateMachine', {margin: 5, curviness: 10, proximityLimit: 80}],
    // 鼠标是否能拖动删除线
    ConnectionsDetachable: true,
    // 删除线的时候节点是否删除
    DeleteEndpointsOnDetach: false,
    /**
     * 连线的两端端点类型：圆形
     * radius: 圆的半径，越大圆越大
     */
    // Endpoint: ['Dot', {radius: 5, cssClass: 'ef-dot', hoverClass: 'ef-dot-hover'}],
    /**
     * 连线的两端端点类型：矩形
     * height: 矩形的高
     * width: 矩形的宽
     */
    // Endpoint: ['Rectangle', {height: 20, width: 20, cssClass: 'ef-rectangle', hoverClass: 'ef-rectangle-hover'}],
    /**
     * 图像端点
     */
    // Endpoint: ['Image', {src: 'https://www.easyicon.net/api/resizeApi.php?id=1181776&size=32', cssClass: 'ef-img', hoverClass: 'ef-img-hover'}],
    /**
     * 空白端点
     */
    Endpoint: ['Blank', {Overlays: ''}],
    // Endpoints: [['Dot', {radius: 5, cssClass: 'ef-dot', hoverClass: 'ef-dot-hover'}], ['Rectangle', {height: 20, width: 20, cssClass: 'ef-rectangle', hoverClass: 'ef-rectangle-hover'}]],
    /**
     * 连线的两端端点样式
     * fill: 颜色值，如：#12aabb，为空不显示
     * outlineWidth: 外边线宽度
     */
    EndpointStyle: {fill: '#1879ffa1', outlineWidth: 1},
    // 是否打开jsPlumb的内部日志记录
    LogEnabled: true,
    /**
     * 连线的样式
     */
    PaintStyle: {
        // 线的颜色
        stroke: '#E0E3E7',
        // 线的粗细，值越大线越粗
        strokeWidth: 1,
        // 设置外边线的颜色，默认设置透明，这样别人就看不见了，点击线的时候可以不用精确点击，参考 https://blog.csdn.net/roymno2/article/details/72717101
        outlineStroke: 'transparent',
        // 线外边的宽，值越大，线的点击范围越大
        outlineWidth: 10,
        style: 'dashed'
    },
    // 鼠标滑过线的样式
    HoverPaintStyle: {
        stroke: '#94bcfd',
        strokeWidth: 1,
        // 虚线
        // dashstyle: "4 2",
    },
    DragOptions: {cursor: 'pointer', zIndex: 2000},
    /**
     *  叠加 参考： https://www.jianshu.com/p/d9e9918fd928
     */
    Overlays: [
        // 箭头叠加
        ['Arrow', {
            width: 10, // 箭头尾部的宽度
            length: 8, // 从箭头的尾部到头部的距离
            location: 1, // 位置，建议使用0～1之间
            direction: 1, // 方向，默认值为1（表示向前），可选-1（表示向后）
            foldback: 0.623 // 折回，也就是尾翼的角度，默认0.623，当为1时，为正三角
        }],
        // ['Diamond', {
        //     events: {
        //         dblclick: function (diamondOverlay, originalEvent) {
        //             console.log('double click on diamond overlay for : ' + diamondOverlay.component)
        //         }
        //     }
        // }],
        ['Label', {
            label: '',
            location: 0.1,
            cssClass: 'aLabel'
        }]
    ],
    // 绘制图的模式 svg、canvas
    RenderMode: 'svg',
    // 滑过锚点效果
    // EndpointHoverStyle: {fill: 'red'}
    Scope: 'jsPlumb_DefaultScope' // 范围，具有相同scope的点才可连接
}
/**
 * 连线参数
 */
export const jsplumbConnectOptions = {
    isSource: true,
    isTarget: true,

    // 动态锚点、提供了4个方向 Continuous、AutoDefault
    anchor: 'Continuous',
    // 设置连线上面的label样式
    labelStyle: {
        cssClass: 'flowLabel'
    },
    // 修改了jsplumb 源码，支持label 为空传入自定义style
    emptyLabelStyle: {
        cssClass: 'emptyFlowLabel'
    }
}
/**
 * 源点配置参数
 */
export const jsplumbSourceOptions = {
    // 设置可以拖拽的类名，只要鼠标移动到该类名上的DOM，就可以拖拽连线
    filter: '.flow-node-drag',
    filterExclude: false,
    anchor: 'Continuous',
    // 是否允许自己连接自己
    allowLoopback: true,
    maxConnections: -1,
    onMaxConnections: function (info, e) {
        console.log(`超过了最大值连线: ${info.maxConnections}`)
    }
}
// 参考 https://www.cnblogs.com/mq0036/p/7942139.html
export const jsplumbSourceOptions2 = {
    // 设置可以拖拽的类名，只要鼠标移动到该类名上的DOM，就可以拖拽连线
    filter: '.flow-node-drag',
    filterExclude: false,
    // anchor: 'Continuous',
    // 是否允许自己连接自己
    allowLoopback: true,
    connector: ['Flowchart', {curviness: 50}],
    connectorStyle: {
        // 线的颜色
        stroke: 'red',
        // 线的粗细，值越大线越粗
        strokeWidth: 1,
        // 设置外边线的颜色，默认设置透明，这样别人就看不见了，点击线的时候可以不用精确点击，参考 https://blog.csdn.net/roymno2/article/details/72717101
        outlineStroke: 'transparent',
        // 线外边的宽，值越大，线的点击范围越大
        outlineWidth: 10
    },
    connectorHoverStyle: {stroke: 'red', strokeWidth: 2}
}
export const jsplumbTargetOptions = {
    // 设置可以拖拽的类名，只要鼠标移动到该类名上的DOM，就可以拖拽连线
    filter: '.flow-node-drag',
    filterExclude: false,
    // 是否允许自己连接自己
    anchor: 'Continuous',
    allowLoopback: true,
    dropOptions: {hoverClass: 'ef-drop-hover'}
}

import Store from '@/store';
import Vue from 'vue';
const SET_CANVAS_SIZE = (data) => Store.commit('SET_CANVAS_SIZE', data);
import { repaintEverything } from './jsplumbMethods'
export const jsplumbDraggable = {
    containment: 'parent',
    grid: [5, 5], // 网格式移动
    // stop: function (el) {
    //     // 拖拽节点结束后的对调
    //     // console.log(arguments);
    //     const { efContainer, flowSize, efContainerStartLeft } = Store.getters;
    //     efContainer.scrollTo(0, 0)
    // },

    // 节点移动中
    drag({el, pos}) {
        const { efContainer, flowSize } = Store.getters;
        const { canvasWidth, canvasHeight, nodeWidth, nodeHeight } = flowSize;
        const [left, top] = pos;
        // 节点距离原点距离
        const sizeWidth = Math.abs(left + ( nodeWidth / 2))  + nodeWidth;
        const sizeHeight = Math.abs(top + ( nodeHeight / 2))  + nodeHeight;

        /***将画布左上角看作原点*/
        // 可视区域边界宽高
        const viewHeight = efContainer.clientHeight;
        const viewWidth = efContainer.clientWidth;
        // 距离原点的距离
        const viewLeft = efContainer.scrollLeft;
        const viewRight = viewLeft + viewWidth;
        const viewTop = efContainer.scrollTop;
        const viewBottom =  viewTop + viewHeight;
        const nodeX = canvasWidth + left + nodeWidth/2; // node的中心点
        const nodeY = canvasHeight + top + nodeHeight/2;
        /***将画布左上角看作原点*/

        // 节点移动到整个画布界限位置
        if(sizeWidth > canvasWidth || sizeHeight > canvasHeight) {
            // 左右扩展
            if(sizeWidth > canvasWidth){
                SET_CANVAS_SIZE({
                    size: sizeWidth,
                    key: 'canvasWidth',
                });
                if(left > 0 ) {
                    efContainer.scrollLeft += 10;
                }else{
                    efContainer.scrollLeft -= 10
                }
            }
            // 上下扩展·
            if(sizeHeight > canvasHeight){
                SET_CANVAS_SIZE({
                    size: sizeHeight,
                    key: 'canvasHeight',
                });
                if(top > 0 ) {
                    efContainer.scrollTop += 10;
                }else{
                    efContainer.scrollTop -= 10
                }
            }
            setTimeout(()=>{
                // 刷新连线位置
                repaintEverything();
            })

            // 超出可视区域边界
        }else if(
            nodeX - nodeWidth < viewLeft ||
            nodeX + nodeWidth > viewRight ||
            nodeY - nodeHeight < viewTop ||
            nodeY + nodeHeight > viewBottom
        ) {
            if(nodeX - nodeWidth < viewLeft) { // 超出左侧
                efContainer.scrollLeft -= 10
            }else if(nodeX + nodeWidth > viewRight) { // 超出右侧
                efContainer.scrollLeft += 10
            }

            if(nodeY - nodeHeight < viewTop) { // 超出上侧
                efContainer.scrollTop -= 10
            }else if(nodeY + nodeHeight > viewBottom) { // 超出下侧
                efContainer.scrollTop += 10
            }
        }
    }
}