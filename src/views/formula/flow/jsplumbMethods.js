import lodash from 'lodash';
import Store from '@/store';
// const jsPlumbInstance = Store.getters.jsPlumbInstance;
const SET_JSPLUMB = (data) => Store.commit('SET_JSPLUMB', data);
const ADD_LINE = (data) => Store.commit('ADD_LINE', data);
const SET_ACTIVE = (data) => Store.commit('SET_ACTIVE', data);
const UPDATE_NODE = (data) => Store.commit('UPDATE_NODE', data);

import {
    jsplumbConnectOptions,
    jsplumbSourceOptions,
    jsplumbSourceOptions2,
    jsplumbTargetOptions,
    jsplumbDraggable,
    jsplumbSetting
} from "./jsplumbConfig";
export function jsPlumbInit() {
    const jsPlumbInstance = Store.getters.jsPlumbInstance;
    jsPlumbInstance.ready(() => {
        // 导入默认配置
        jsPlumbInstance.importDefaults(jsplumbSetting)
        // 会使整个jsPlumb立即重绘。
        jsPlumbInstance.setSuspendDrawing(false, true);
        // 初始化节点
        this.loadEasyFlow()
        // 单点击了连接线, https://www.cnblogs.com/ysx215/p/7615677.html
        jsPlumbInstance.bind('click', (conn, originalEvent) => {
            const { sourceId, targetId } = conn;
            SET_ACTIVE({
                type: 'line',
                activeId: {
                    sourceId,
                    targetId
                },
            })
        })
        // 连线
        jsPlumbInstance.bind("connection", (evt) => {
            const { sourceId, targetId } = evt;
            ADD_LINE({
                sourceId,
                targetId
            })
        })

        // 删除连线回调
        jsPlumbInstance.bind("connectionDetached", (evt) => {
            // console.log('删除连线回调');
            // this.deleteLine(evt.sourceId, evt.targetId)
        })

        // 改变线的连接节点
        jsPlumbInstance.bind("connectionMoved", (evt) => {
            // this.changeLine(evt.originalSourceId, evt.originalTargetId)
        })

        // 连线右击
        jsPlumbInstance.bind("contextmenu", (evt) => {
            console.log('contextmenu', evt);
            const { sourceId, targetId } = evt;
            this.clickShowLineMenu(evt);
            SET_ACTIVE({
                type: 'line',
                activeId: {
                    sourceId,
                    targetId
                },
            })
        })

        // 移动连线
        jsPlumbInstance.bind('connectionMoved', (pos)=>{
            console.log(pos);
        })

        // 连线
        jsPlumbInstance.bind("beforeDrop", (evt) => {
            let from = evt.sourceId
            let to = evt.targetId
            if (from === to) {
                this.$message.error('节点不支持连接自己')
                return false
            }
            if (this.hasLine(from, to)) {
                this.$message.error('该关系已存在,不允许重复创建')
                return false
            }
            if (this.hashOppositeLine(from, to)) {
                this.$message.error('不支持两个节点之间连线回环');
                return false
            }
            this.$message.success('连接成功')
            return true
        })

        // beforeDetach
        jsPlumbInstance.bind("beforeDetach", (evt) => {
            console.log('beforeDetach', evt)
        })
        jsPlumbInstance.setContainer(this.$refs.efContainer)
    })
}
// 加载流程图
export function loadEasyFlow(data = this.flowNodeLine) {
    const jsPlumbInstance = Store.getters.jsPlumbInstance;
    // 初始化节点
    for (let i = 0; i < data.nodeList.length; i++) {
        let node = data.nodeList[i]
        // 设置源点，可以拖出线连接其他节点
        jsPlumbInstance.makeSource(node.id, lodash.merge(jsplumbSourceOptions, {}))
        // // 设置目标点，其他源点拖出的线可以连接该节点
        jsPlumbInstance.makeTarget(node.id, jsplumbTargetOptions)
        if (!node.viewOnly) {
            jsPlumbInstance.draggable(node.id, jsplumbDraggable)
        }
    }
    // 初始化连线
    for (let i = 0; i < data.lineList.length; i++) {
        let line = data.lineList[i]
        let connParam = {
            source: line.sourceId,
            target: line.targetId,
            // label: line.label ? line.label : '',
            // connector: line.connector ? line.connector : '',
            // anchors: line.anchors ? line.anchors : undefined,
            // paintStyle: line.paintStyle ? line.paintStyle : undefined,
        }
        jsPlumbInstance.connect(connParam, jsplumbConnectOptions)
        // console.log(jsPlumbInstance.getConnections({
        //     source: line.sourceId,
        //     target: line.targetId
        // }));
    }
    this.$nextTick(function () {
        this.loadEasyFlowFinish = true;
        this.scrollIntoView();
    })
}

// 返回唯一标识
export function getUUID() {
    return Math.random().toString(36).substr(3, 10)
}

// 设置连线条件
export function setLineLabel(from, to, label) {
    const jsPlumbInstance = Store.getters.jsPlumbInstance;
    let conn = jsPlumbInstance.getConnections({
        source: from,
        target: to
    })[0]
    if (!label || label === '') {
        conn.removeClass('flowLabel')
        conn.addClass('emptyFlowLabel')
    } else {
        conn.addClass('flowLabel')
    }
    conn.setLabel({
        label: label,
    })
    this.flowNodeLine.lineList.forEach(function (line) {
        if (line.from == from && line.to == to) {
            line.label = label
        }
    })
}

// 删除激活的元素
export function deleteElement() {
    const jsPlumbInstance = Store.getters.jsPlumbInstance;
    if (this.activeElement.type === 'node') {
        this.deleteNode(this.activeElement.nodeId)
    } else if (this.activeElement.type === 'line') {
        this.$confirm('确定删除所点击的线吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            let conn = jsPlumbInstance.getConnections({
                source: this.activeElement.sourceId,
                target: this.activeElement.targetId
            })[0]
            jsPlumbInstance.deleteConnection(conn)
        }).catch(() => {
        })
    }
}
// 是否含有相反的线
export function hashOppositeLine(from, to) {
    return this.hasLine(to, from)
}

// 是否具有该线
export function hasLine(sourceId, targetId) {
    for (let i = 0; i < this.flowNodeLine.lineList.length; i++) {
        let line = this.flowNodeLine.lineList[i]
        if (line.sourceId === sourceId && line.targetId === targetId) {
            return true
        }
    }
    return false
}

// 加载流程图
export function dataReload() {
    this.easyFlowVisible = false;
    this.$nextTick(() => {
        this.easyFlowVisible = true;
        this.$nextTick(() => {
            SET_JSPLUMB(window.jsPlumb.getInstance())
            // this.jsPlumb = window.jsPlumb.getInstance()
            this.$nextTick(() => {
                this.jsPlumbInit()
            })
        })
    })
}

export function repaintEverything() {
    const jsPlumbInstance = Store.getters.jsPlumbInstance;
    jsPlumbInstance.repaint();
    jsPlumbInstance.setSuspendDrawing(false,true);
}

/**
 * 拖拽结束后添加新的节点
 * @param evt
 * @param nodeMenu 被添加的节点对象
 * @param mousePosition 鼠标拖拽结束的坐标
 */
export function addNode(evt, nodeMenu, mousePosition) {
    const jsPlumbInstance = Store.getters.jsPlumbInstance;
    let screenX = evt.originalEvent.clientX, screenY = evt.originalEvent.clientY
    let efContainer = this.$refs.efContainer
    let containerRect = efContainer.getBoundingClientRect()
    let left = screenX, top = screenY
    // 计算是否拖入到容器中
    if (left < containerRect.x || left > containerRect.width + containerRect.x || top < containerRect.y || containerRect.y > containerRect.y + containerRect.height) {
        this.$message.error("请把节点拖入到画布中")
        return
    }
    left = left - containerRect.x + efContainer.scrollLeft
    top = top - containerRect.y + efContainer.scrollTop
    // 居中
    left -= 85
    top -= 16
    let nodeId = this.getUUID()
    // 动态生成名字
    let origName = nodeMenu.name
    let nodeName = origName
    let index = 1
    while (index < 10000) {
        let repeat = false
        for (let i = 0; i < this.flowNodeLine.nodeList.length; i++) {
            let node = this.flowNodeLine.nodeList[i]
            if (node.name === nodeName) {
                nodeName = origName + index
                repeat = true
            }
        }
        if (repeat) {
            index++
            continue
        }
        break
    }
    let node = {
        id: nodeId,
        name: nodeName,
        type: nodeMenu.type,
        left: left + 'px',
        top: top + 'px',
        ico: nodeMenu.ico,
        state: 'success'
    }
    /**
     * 这里可以进行业务判断、是否能够添加该节点
     */
    // this.flowNodeLine.nodeList.push(node)
    // this.$nextTick(function () {
    //     jsPlumbInstance.makeSource(nodeId, jsplumbSourceOptions);
    //     jsPlumbInstance.makeTarget(nodeId, jsplumbTargetOptions);
    //     jsPlumbInstance.draggable(nodeId, jsplumbDraggable);
    // })
}

// 改变节点的位置
export function changeNodeSite(data) {
    const { nodeId: id, left, top } = data;
    UPDATE_NODE({
        id, left, top
    })
}