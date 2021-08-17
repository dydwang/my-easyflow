<template>
    <div
        ref="node"
        :style="nodeContainerStyle"
        @mousedown="clickNode"
        @mouseup="changeNodeSite"
        :class="nodeContainerClass"
    >
        <div class="ef-node-left-ico iconfont dyd-menu" @click="$emit('showNodeParams')"></div>
        <!-- 节点名称   文字过长时显示文字提示-->
        <div class="ef-node-text" ref="node-text" v-tooltip.ellipsis="tooltip">
            {{node.name}}
        </div>
<!--        <div-->
<!--            @mousedown="mousedownLine"-->
<!--            class="ef-node-right-ico ef-node-spot"-->
<!--            :class="nodeIcoClass">·</div>-->
    </div>
</template>

<script>
import { mapGetters, mapMutations }  from 'vuex';
export default {
    props: {
        node: Object,
    },
    data() {
        return {
            isMove: false, // 是否正在移动节点
            showTooltip: false,
        }
    },
    mounted() {

    },
    computed: {
        ...mapGetters(['activeElement', 'efContainer', 'efContainerStartLeft', 'efContainerStartTop', 'flowSize']),
        // 节点的文字提示
        tooltip() {
            return {
                content: this.node.name,
                disabled: this.isMove,
            }
        },
        // 节点容器的class
        nodeContainerClass() {
            return {
                'ef-node-container': true,
                'ef-node-active': this.activeElement.type === 'node' ? this.activeElement.nodeId === this.node.id : false
            }
        },
        // 节点容器样式
        nodeContainerStyle() {
            return {
                top: this.node.top + 'px',
                left: this.node.left + 'px'
            }
        },
        nodeIcoClass() {
            let nodeIcoClass = {}
            nodeIcoClass[this.node.ico] = true
            // 添加该class可以推拽连线出来，viewOnly 可以控制节点是否运行编辑
            nodeIcoClass['flow-node-drag'] = !this.node.viewOnly
            return nodeIcoClass
        },
    },
    methods: {
        ...mapMutations(['SET_ACTIVE']),
        // 点击节点
        clickNode(e) {
            this.SET_ACTIVE({
                activeId: this.node.id,
                type: 'node'
            });
            console.log(e.button);
            if(e.button === 2){
                // 你点了右键
                this.$emit('clickRight');
            }else if(e.button === 0){
                // 鼠标左键 强制关闭弹框
                this.$emit('onClickOutside');
                this.isMove = true;
            }
        },
        // 获取style定位里的数字
        getPositionNumber(val) {
            return Number(val.split('px')[0])
        },
        // 鼠标移动后抬起
        changeNodeSite() {
            this.isMove = false;
            const styleLeft = this.getPositionNumber(this.$refs.node.style.left);
            const styleTop = this.getPositionNumber(this.$refs.node.style.top);
            // 避免抖动
            if (this.node.left === styleLeft && this.node.top === styleTop) {
                return;
            }
            this.$emit('changeNodeSite', {
                nodeId: this.node.id,
                left: styleLeft,
                top: styleTop,
            });
        },
        // 按住鼠标连线过程中
        mousedownLine() {
            const { efContainer, flowSize } = this;
            const { nodeWidth, nodeHeight } = flowSize;
            /***将画布左上角看作原点*/
                // 可视区域边界宽高
            const viewHeight = efContainer.clientHeight;
            const viewWidth = efContainer.clientWidth;
            /***将画布左上角看作原点*/

            document.onmouseup = () => {
                document.onmousemove = null;
            }
            document.onmousemove = (e) =>{
                // 距离原点的距离
                const viewLeft = efContainer.scrollLeft;
                const viewRight = viewLeft + viewWidth;
                const viewTop = efContainer.scrollTop;
                const viewBottom =  viewTop + viewHeight;

                const { pageX, pageY } = e;
                // 鼠标在画布中的位置
                const left = pageX - 20 + efContainer.scrollLeft;
                const top = pageY - 126 + efContainer.scrollTop;
                if(left - nodeWidth < viewLeft) { // 超出左侧
                    efContainer.scrollLeft -= 10
                }else if(left + nodeWidth > viewRight) { // 超出右侧
                    efContainer.scrollLeft += 10
                }

                if(top - nodeHeight < viewTop) { // 超出上侧
                    efContainer.scrollTop -= 10
                }else if(top + nodeHeight > viewBottom) { // 超出下侧
                    efContainer.scrollTop += 10
                }
            }
        }
    }
}
</script>
