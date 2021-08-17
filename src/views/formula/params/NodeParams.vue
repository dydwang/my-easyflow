<template>
<!--    节点参数配置框-->
<!--    修改节点名称修改name-->
    <div class="node-params">
        节点参数配置框
        {{selectElement}}
    </div>
</template>

<script>
// 关闭弹框
// this.$emit('onClickOutside')
import { mapGetters, mapMutations }  from 'vuex';
export default {
    name: "NodeParams",
    components: {},
    props: {},
    computed: {
        // 不直接修改 activeElement
        ...mapGetters(['activeElement']),
    },
    watch: {
        // 切换节点
        'activeElement.nodeId'() {
            this.selectElement = JSON.parse(JSON.stringify(this.activeElement));
        }
    },
    data() {
        return {
            selectElement: {},
        }
    },
    mounted() {

    },
    created() {
    },
    destroyed() {
    },
    methods: {
        // 修改节点信息  this.UPDATE_NODE(this.selectElement.node)
        ...mapMutations(['UPDATE_NODE']),
        // 显示节点输入框
        init() {
            console.log('init');
        }
    }
}
</script>

<style scoped lang="scss">
.node-params {
    padding: 12px;
    max-height: 400px;
    overflow: auto;
}
</style>