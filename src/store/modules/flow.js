import result from "@/views/formula/flow/result";
import AutoNode from "@/views/formula/flow/autoNode";
import random from "@/views/formula/flow/random";
import { jsplumbSourceOptions, jsplumbTargetOptions, jsplumbDraggable } from "@/views/formula/flow/jsplumbConfig";
import Vue from 'vue';
import {
    getFormulaAPI,
    getFormulaResultAPI,
    uploadFormulaAPI
} from '@/api/formula';
import axios from "axios";
export default {
    state: {
        jsPlumbInstance: {},
        flowSize: {
            // canvasSize: 2000, // 画布大小 如果为100 画布实际为  200 * 200
            canvasWidth: 2000, // 画布宽度的一半
            canvasHeight: 2000, // 画布高度的一半
            nodeWidth: 170, // 节点宽度
            nodeHeight: 40, // 节点高度
            nodeDistanceX: 40,// 节点X轴距离
            nodeDistanceY: 80, // 节点Y轴距离
            startY: -320, // 第一层节点Y坐标值
        },
        // 画布容器
        efContainer: {
            clientWidth: 0,
            clientHeight: 0
        },
        // 当前流程图的连线和节点
        flowNodeLine: {
            nodeList: [],
            lineList: []
        },
        // 原始的当前流程图的连线和节点
        // 切换流程不保存时恢复
        saveFlowNodeLine: {
            nodeList: [],
            lineList: []
        },
        // 选中的节点或者连线
        activeElement: {
            // 可选值 node 、line
            type: undefined,
            // 节点ID
            nodeId: undefined,
            // 连线ID
            sourceId: undefined, // 出发节点id
            targetId: undefined, // 被连接节点id
            // 选中的元素信息
            node:{}
        },
    },
    mutations: {
        // 设置jsPlumb流程实例
        SET_JSPLUMB(state, data) {
            state.jsPlumbInstance = data;
        },
        SET_CANVAS_SIZE(state, data) {
            const { key, size } = data;
            state.flowSize[key] = size;
        },
        // 获取当前流程图的连线和节点
        GET_fLOW_NODE_LINE(state) {
            let data = random(20, 15);
            console.log(data);
            state.flowNodeLine = data;
            // 自动布局
            this.commit('AUTO_NODE');
        },
        // 自动布局节点
        AUTO_NODE(state) {
            // 自动布局
            const config = {
                flowNodeLine: state.flowNodeLine,
                startY: -320,
                nodeWidth: 170,
                nodeHeight: 40,
                nodeDistanceX: 40,
                nodeDistanceY: 80
            };
            // 存储一份原始数据
            new AutoNode(config).init();
        },
        // 选中节点或者连线
        // activeId 元素id type 节点还是连线 node line
        SET_ACTIVE(state, {activeId, type}) {
            if(type === 'node') { // 节点
                const { nodeList } = state.flowNodeLine;
                let node = nodeList.filter(nodeItem => nodeItem.id === activeId)[0];
                state.activeElement = {
                    type,
                    node,
                    nodeId: activeId
                }
            }else{ // 连线
                let { sourceId, targetId } = activeId;
                let lineList = state.flowNodeLine.lineList;
                let line = lineList.filter(lineItem => lineItem.sourceId === sourceId && lineItem.targetId === targetId)[0];
                state.activeElement = {
                    type,
                    line,
                    sourceId,
                    targetId,
                }
                console.log(state.activeElement);
            }
        },
        // 连线
        SET_CONNECTION(state, {sourceId, targetId}) {
            state.flowNodeLine.lineList.push({
                sourceId,
                targetId
            })
        },
        /**
         * 保存拦截
         * @call 离开四种种方式 直接离开 leave  不保存留下 direct  保存成功离开 save 保存失败留下 fail
         */
        SAVE_INTERCEPT(state, call){
            console.log(state.formulaOld, state.formula);
            const isNeed = this.getters.isNeedSaveFlow;
            // 如果流程图发生改变 需要保存
            if(isNeed){
                Vue.prototype.$confirm('您绘制的流程还未保存请确认是否要保存?', '提示', {
                    confirmButtonText: '保存',
                    cancelButtonText: '取消',
                    type: 'warning',
                    distinguishCancelAndClose: true
                }).then(() => {
                    // 调用保存接口判断是否保存成功
                    call('save') // 保存成功 save  否则返回 fail
                }).catch((action ) => {
                    let val = action === 'cancel' ? 'leave' : 'direct'
                    call(val) // 点击取消离开
                });
            }else{
                call('leave') // 无需保存直接离开
            }
        },
        // 画布容器
        SET_CONTAINER(state, efContainer) {
            state.efContainer = efContainer;
            // for(let key in efContainer){
            //     state.efContainer[key] = efContainer[key];
            // }
        },
        // 添加节点
        ADD_NODE(state, nodeInfo){
            const { left, top, info = {} } = nodeInfo;
            const { nodeList } = state.flowNodeLine;
            const nodeId = nodeList.length + '';
            nodeList.push({
                ...info,
                id: nodeId,
                left,
                top,
            });
            Vue.nextTick(function () {
                state.jsPlumbInstance.makeSource(nodeId, jsplumbSourceOptions);
                state.jsPlumbInstance.makeTarget(nodeId, jsplumbTargetOptions);
                state.jsPlumbInstance.draggable(nodeId, jsplumbDraggable);
            })
        },
        // 修改节点信息
        UPDATE_NODE(state, data = {}) {
            const { nodeList } = state.flowNodeLine;
            const index = nodeList.findIndex(node => data.id === node.id);
            const node = nodeList[index];
            for(let key in data) {
                node[key] = data[key];
            }
        },
        // 连线
        ADD_LINE(state, data={}){
            state.flowNodeLine.lineList.push({...data});
            // console.log(state.jsPlumbInstance);
        },
        // 删除节点
        DELETE_NODE(state, nodeId) {
            const { nodeList, lineList } = state.flowNodeLine;
            const index = nodeList.findIndex(node => nodeId === node.id);
            lineList.forEach(line => {
                if(line.sourceId === nodeId || line.targetId === nodeId) {
                    this.commit('DELETE_LINE',{
                        sourceId: line.sourceId,
                        targetId: line.targetId
                    })
                }
            });
            nodeList.splice(index, 1);
            state.jsPlumbInstance.removeAllEndpoints(nodeId);
            state.activeElement.type = null;
            state.activeElement.node = {};
        },
        // 删除线条
        DELETE_LINE(state, data) {
            const { lineList, nodeList } = state.flowNodeLine;
            const { sourceId, targetId } = data;
            const index = lineList.findIndex(line => line.sourceId === sourceId && line.targetId === targetId);
            let conn = state.jsPlumbInstance.getConnections({
                source: sourceId,
                target: targetId
            })[0];
            state.jsPlumbInstance.deleteConnection(conn);
            lineList.splice(index, 1);
            // 改变节点里的 algo_up_id
            const node = nodeList.filter(node=> node.id === targetId)[0];
            if(node) {
                if(typeof node.algo_up_id === 'number') {
                    node.algo_up_id = null;
                }else if(node.algo_up_id.length){
                    let lineIndex = node.algo_up_id.findIndex(lineId => lineId === sourceId);
                    node.algo_up_id.splice(lineIndex, 1);
                    // 如果只剩一个父节点后，转化为数字型
                    if(node.algo_up_id.length === 1 ){
                        node.algo_up_id = node.algo_up_id[0];
                    }
                }
            }

            if( sourceId === state.activeElement.sourceId && targetId === state.activeElement.targetId) {
                state.activeElement.type = null;
                state.activeElement.node = {};
            }
        },
    },
    actions: {
    }
}

