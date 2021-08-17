<template>
    <div class="node-menu">
        <ul class="node-menu-ul">
            <li
                @click="item.disabled || clickMenu(item.methods)"
                class="node-menu-li"
                :class="{ 'is-disabled': item.disabled}"
                v-for="item in (isNode ? nodeMenuList: lineMenuList)"
                :key="item.label">
                <i :class="item.icon"></i>
                <span class="node-menu-li-label" >
                    {{item.label}}
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters, mapMutations }  from 'vuex';
export default {
    name: "NodeMenu",
    components: {},
    props: {
        isNode:{
            type: Boolean
        }
    },
    computed: {
        ...mapGetters(['activeElement', 'flowSize', 'flowNodeLine']),
    },
    watch: {},
    data() {
        return {
            nodeMenuList:[
                {
                    label: '复制',
                    icon: 'el-icon-document-copy',
                    methods: 'copyNode',
                    disabled: false
                },
                {
                    label: '删除',
                    icon: 'el-icon-delete',
                    methods: 'deleteNode',
                    disabled: false
                },
                // {
                //     label: '重命名',
                //     icon: 'el-icon-edit-outline',
                //     methods: 'copyNode',
                //     disabled: false
                // }
            ],
            lineMenuList: [
                {
                    label: '删除',
                    icon: 'el-icon-delete',
                    methods: 'deleteLine',
                    disabled: false
                },
            ]
        }
    },
    mounted() {
    },
    created() {
    },
    destroyed() {
    },
    methods: {
        ...mapMutations(['ADD_NODE', 'DELETE_NODE', 'DELETE_LINE']),
        clickMenu(key) {
            this.$emit('onClickOutside');
            this[key]()
        },
        // 复制节点
        copyNode() {
            let { left, top } = this.activeElement.node;
            const { nodeWidth, nodeDistanceX } = this.flowSize;
            left += (nodeWidth + nodeDistanceX);
            const { nodeList } = this.flowNodeLine;
            const isPosition = nodeList.some(node => node.left === left && node.top === top);
            // 复制的位置是否已经有节点
            // 如果有 位置随机偏移 正负10px
            if(isPosition) {
                left += Math.random() * 5 * (Math.random() > 0.5 ? -1 : 1);
                top += Math.random() * 5 * (Math.random() > 0.5 ? -1 : 1);
            }
            this.ADD_NODE({
                left,
                top,
                info: { ...this.activeElement.node } // 复制节点详细信息
            })
        },
        deleteNode() {
            this.DELETE_NODE(this.activeElement.nodeId);
        },
        deleteLine() {
            this.DELETE_LINE({
                sourceId: this.activeElement.sourceId,
                targetId: this.activeElement.targetId,
            })
        }
    }
}
</script>

<style scoped lang="scss">
.node-menu {
    .node-menu-ul {
        margin: 0;
        padding: 0;
        .node-menu-li {
            height: 32px;
            line-height: 32px;
            padding: 0 10px;
            list-style-type:none;
            color: #595959;
            font-size: 12px;
            &:hover {
                color:#333333;
                background-color: rgba(229, 238, 255, .85);
                cursor: pointer;
            }
        }
        .is-disabled {
            color: #999999 !important;
            cursor: not-allowed !important;
        }
    }

}
</style>