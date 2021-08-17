<template>
<!--    右侧节点结果，缺陷结果-->
    <div class="node-flow-result">
        <el-radio-group v-model="drawerType" size="small" >
            <el-radio-button label="node"> 节 点 </el-radio-button>
            <el-radio-button label="flow"> 缺 陷 </el-radio-button>
        </el-radio-group>

<!--        节点-->
        <div v-if="drawerType === 'node' && activeElement.type === 'node'">
            {{ activeElement }}
        </div>
<!--        缺陷-->
        <div v-else-if="drawerType === 'flow'">
            {{ flowFlaws }}
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations }  from 'vuex';
export default {
    name: "info",
    components: {},
    props: {
    },
    computed: {
        ...mapGetters(['activeElement']),
    },
    watch: {},
    data() {
        return {
            drawerType: 'node',
        }
    },
    mounted() {
    },
    created() {
    },
    destroyed() {
    },
    methods: {}
}
</script>

<style scoped lang="scss">
.node-flow-result /deep/{
    padding: 10px;
    max-height: 100%;
    overflow: auto;
    word-break: break-all;
    .el-radio-group{
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        .el-radio-button__inner {
            display: block;
            width: 100px;
        }
    }
}
</style>