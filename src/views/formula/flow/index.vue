<template>
    <div class="easy-flow" :style="{ '--scrollbarWidth': scrollbarWidth}">
        <right-menu @scrollIntoView="scrollIntoView" @changeRoom="val => this.zoom = val "></right-menu>
        <div id="efContainer" ref="efContainer" class="container" v-flowDrag v-if="easyFlowVisible">
            <!-- 给画布一个默认的宽度和高度 -->
            <div
                :style="{
                    width: `${flowSize.canvasWidth}px`,
                    left: `${flowSize.canvasWidth}px`,
                    height: `${flowSize.canvasHeight}px`,
                    top: `${flowSize.canvasHeight}px`,
                 }"
                style="position:absolute;">

                <template v-for="node in flowNodeLine.nodeList">
<!--                    节点-->
                    <flow-node
                        :id="node.id"
                        :key="node.id"
                        :node="node"
                        @changeNodeSite="changeNodeSite"
                        @showNodeParams="clickShowNodeParams"
                        @clickRight="clickShowNodeMenu"
                        @onClickOutside="onClickOutside"
                    >
                    </flow-node>
                </template>

<!--                弹框-->
                <el-popover
                    v-click-outside.native="vcoConfig"
                    :width="popoverInfo.width"
                    title=""
                    :visible-arrow="true"
                    :value="showPopover"
                    :close-delay="10"
                    :style="nodeParamsContainerStyle"
                    style="position: absolute;"
                    ref="popover"
                    placement="bottom"
                    >
<!--                    小三角形-->
                    <div x-arrow="" class="popper__arrow" :style="popArrow"></div>
<!--                    节点信息编辑-->
                    <node-params v-show="showNodeParams" @onClickOutside="onClickOutside"></node-params>
<!--                    菜单-->
                    <node-menu v-show="showNodeMenu || showLineMenu" :isNode="!!showNodeMenu" @onClickOutside="onClickOutside"></node-menu>
                </el-popover>
            </div>
        </div>
    </div>
</template>

<script>
import './index.css'
import draggable from 'vuedraggable';
import './jsplumb';
import {mapActions, mapGetters, mapMutations} from 'vuex';
import flowNode from './node';
import Vue from 'vue';
import {
    dataReload,
    deleteElement,
    hashOppositeLine,
    hasLine,
    jsPlumbInit,
    loadEasyFlow,
    setLineLabel,
    repaintEverything,
    changeNodeSite
} from './jsplumbMethods';
import RightMenu from "./RightMenu";
import NodeParams from "../params/NodeParams";
import NodeMenu from "./NodeMenu";
export default {
    name: "index",
    // eslint-disable-next-line vue/no-unused-components
    components: {NodeMenu, NodeParams, RightMenu, flowNode },
    props: {},
    computed: {
        ...mapGetters(['activeElement', 'flowNodeLine', 'flowSize', 'efContainer', 'efContainerStartLeft', 'efContainerStartTop', 'jsPlumbInstance', 'isNeedSaveFlow']),
        // v-click-outside 配置
        vcoConfig() {
            return {
                // 点击绑定元素外回调函数
                handler: this.onClickOutside,
                // 是否绑定
                isActive: this.showPopover,
            }
        },
        showPopover() {
          return this.showNodeParams || this.showNodeMenu || this.showLineMenu
        },
        // popover 弹框宽度
        popoverInfo() {
            return this.showNodeParams
                ? {
                    width: 440,
                    title: '节点配置'
                } : {
                    width: 140,
                    title: ''
                };
        },
        // 弹框
        nodeParamsContainerStyle() {
            // 节点的弹框和菜单
            if(this.activeElement && this.activeElement.node) {
                const activeTop = this.activeElement.node.top;
                const flowNodeHeight = this.flowSize.nodeHeight;
                const activeLeft = this.activeElement.node.left;
                const flowNodeWidth = this.flowSize.nodeWidth;
                // 居中
                // return {
                //     top: activeTop + flowNodeHeight + 10 + 'px',
                //     left: activeLeft - (this.popoverInfo.width - flowNodeWidth)/2 + 'px'
                // }
                return {
                    top: activeTop + flowNodeHeight + 10 + 'px',
                    left: activeLeft + 'px'
                }
            }else{
                // 连线的弹框
                return {
                    left: this.lineMenuPos.posX + 'px',
                    top: this.lineMenuPos.posY + 'px',
                }
            }
        },
        // 弹框的小箭头
        popArrow() {
            return {
                left: '20px', //  this.popoverInfo.width/2 - 6 + 'px', // 居中
                top: -12 + 'px',
            }
        },
        //滚动条宽高
        scrollbarWidth() {
            return 0.2 * (1/this.zoom) + 'rem'
        }
    },
    watch: {},
    data() {
        return {
            // jsPlumb 实例
            // jsPlumb: window.jsPlumb.getInstance(),
            // 控制画布销毁
            easyFlowVisible: true,
            // 控制流程数据显示与隐藏
            flowInfoVisible: false,
            // 是否加载完毕标志位
            loadEasyFlowFinish: false,
            flowHelpVisible: false,
            // 缩放系数
            zoom: 1,
            // 显示节点信息编辑
            showNodeParams: false,
            // 显示节点或连线的菜单
            showNodeMenu: false,
            // 显示连线菜单
            showLineMenu: false,
            // 连线菜单的位置
            lineMenuPos: {
                posX: 0,
                posY: 0
            }
        }
    },
    destroyed() {
        document.oncontextmenu = function() {
            return true;
        }
    },
    mounted() {

        //禁止鼠标右键
        document.oncontextmenu = function() {
            return false;
        }
        this.GET_fLOW_NODE_LINE(this.$refs.efContainer);

        window.onbeforeunload = (event) => {
            // 改变过流程图需要保存
            // return this.isNeedSaveFlow;
        };
        this.$nextTick(() => {
            // 默认加载流程A的数据、在这里可以根据具体的业务返回符合流程数据格式的数据即可
            this.dataReload();
        })
    },
    created() {
    },
    updated() {
        this.SET_CONTAINER(this.$refs.efContainer);
    },
    methods: {
        ...mapMutations(['GET_fLOW_NODE_LINE', 'SET_CONNECTION', 'SAVE_INTERCEPT', 'SET_CONTAINER', 'SET_JSPLUMB']),
        ...mapActions(['GetFormula']),
        dataReload,
        jsPlumbInit,
        loadEasyFlow,
        setLineLabel,
        hashOppositeLine,
        hasLine,
        repaintEverything,
        changeNodeSite,
        // 保存拦截
        saveIntercept(next) {
            // 销毁界面前保存拦截
            this.SAVE_INTERCEPT(status => {
                console.log(status);
                next()
            })
        },
        // 跳转到画布中心点
        scrollIntoView() {
            const [ x, y ] = [ this.efContainerStartLeft, this.efContainerStartTop ];
            this.$refs.efContainer.scrollTo(x, y); // 定位到中心点
        },
        // 显示连线菜单
        clickShowLineMenu() {
            let event = window.event;
            console.log(event.screenX , event);
            let posX = (event.pageX - 46) * (1/this.zoom) + this.efContainer.scrollLeft -  this.flowSize.canvasWidth;
            let posY = (event.pageY - 110) * (1/this.zoom) + this.efContainer.scrollTop -  this.flowSize.canvasHeight ;
            console.log(posX,posY);
            this.lineMenuPos = {
                posX,
                posY,
            }
            if(!this.showLineMenu) {
                this.showNodeMenu = false;
                this.showNodeParams = false;
                this.showLineMenu = false;
                this.$nextTick(()=>{
                    this.showLineMenu = true;
                });
            }
        },
        // 显示节点弹框
        clickShowNodeParams() {
            // console.log('showNodeParams');
            if(!this.showNodeParams) {
                this.showNodeMenu = false;
                this.showNodeParams = false;
                this.showLineMenu = false;
                this.$nextTick(()=>{
                    this.showNodeParams = true;
                });
            }
        },
        // 显示节点菜单
        clickShowNodeMenu() {
            if(!this.showNodeMenu) {
                this.showNodeMenu = false;
                this.showNodeParams = false;
                this.showLineMenu = false;
                this.$nextTick(()=>{
                    this.showNodeMenu = true;
                });
            }
        },
        // 点击弹框以外部分
        onClickOutside () {
            // console.log('onClickOutside');
            this.showNodeParams = false;
            this.showNodeMenu = false;
            this.showLineMenu = false;
        },
        // Note: The middleware will be executed if the event was fired outside the element.
        //       It should have only sync functionality and it should return a boolean to
        //       define if the handler should be fire or not
    },
    directives: {
        // 拖拽画布
        'flowDrag': {
            bind(el, binding, vnode, oldNode) {
                if (!binding) {
                    return
                }
                el.onmousedown = (e) => {
                    if (e.button == 2) {
                        // 右键不管
                        return
                    }
                    //  鼠标按下，计算当前原始距离可视区的高度
                    let disX = e.clientX
                    let disY = e.clientY
                    el.style.cursor = 'move'

                    document.onmousemove = function (e) {
                        // 移动时禁止默认事件
                        e.preventDefault()
                        const left = e.clientX - disX
                        disX = e.clientX
                        el.scrollLeft += -left

                        const top = e.clientY - disY
                        disY = e.clientY
                        el.scrollTop += -top
                    }

                    document.onmouseup = function (e) {
                        el.style.cursor = 'auto'
                        document.onmousemove = null
                        document.onmouseup = null
                    }
                }
            }
        }
    },
}
</script>

<style scoped lang="scss">
.easy-flow {
    width: 100%;
    height: 100%;
    position: static;
    ::-webkit-scrollbar { /*滚动条整体样式*/
        width: var(--scrollbarWidth) !important;
        height:var(--scrollbarWidth) !important;
    }
    /deep/.popper__arrow {
        z-index: 2000;
        border-bottom-color: #ffffff;
    }
    /deep/.el-popover {
        padding: 0;
        min-width: 0;
    }
}
</style>