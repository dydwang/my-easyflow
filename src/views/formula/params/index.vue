<template>
    <div class="params" id="params-flow">
        <el-row>
            <div>
<!--                <el-button type="primary" @click="showNodeInfo('flow')"> 缺陷结果 </el-button>-->
                <div style="display: inline-block;float: right">
                    <el-button type="primary" @click="clickSave"> 保存 </el-button>
                </div>
            </div>
        </el-row>
        <el-row class="flow-main">
            <div class="flow-main-flow">
                <easy-flow ref="flow"></easy-flow>
            </div>
        </el-row>
    </div>
</template>

<script>
import EasyFlow from '../flow';
import { mapMutations, mapActions }  from 'vuex';
import NodeFlowResult from "./NodeFlowResult";
import {
    getFormulaResultAPI
} from '@/api/formula'
export default {
    name: "index",
    components: {NodeFlowResult, EasyFlow },
    props: {},
    computed: {},
    watch: {},
    data() {
        return {
            lib_id: 1, // 算法id
        }
    },
    mounted() {
    },
    created() {

    },
    beforeRouteLeave(to, from, next) {
        //console.log('beforeRouteLeave');
        this.$refs.flow.saveIntercept(next);
    },
    methods: {
        ...mapMutations(['GET_fLOW_NODE_LINE', 'CHANGE_FLOW', 'MACHINING_FORMULA']),
        ...mapActions(['GetFormulaResult', 'InitFlow']),
        cascaderChange(lib_id) {
            this.CHANGE_FLOW(lib_id);
            this.$refs.flow.dataReload()
        },
        // 点击保存时先获取配方数据
        clickSave() {
            let formula = null;
            this.MACHINING_FORMULA(data => formula = data);
            console.log(formula);
        }
    }
}
</script>

<style scoped lang="scss">
    .params {
        height: 100%;
        .flow-main {
            width: 100% !important;
            height: calc(100% - 50px);
            margin-top: 10px;
            .flow-main-flow,
            .flow-main-right {
                float: left;
            }
            .flow-main-flow {
                width: 100% !important;
                height: 100%;
                position: relative;
            }
            .flow-main-right {
                width: 400px !important;
                height: 100%;
                border-left: 10px solid #ffffff;
                background-color: rgba(245, 247, 250, .8);
            }
        }
    }
</style>