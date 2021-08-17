<template>
    <el-table-column class="dyd-table-column" ref="dyd-table-column" v-bind="$attrs" v-on="$listeners" :show-overflow-tooltip="false">
        <template v-slot="scope">
            <el-tooltip v-if="isTextTooLong(scope)" ref="tooltip" effect="dark" placement="top" :disabled="!showTooltip[scope.$index]">
                <template #content>
                    <slot :row="scope.row" :$index="scope.$index" :column="scope.column">
                        {{ getData(scope.row, $attrs.prop) }}
                    </slot>
                </template>
                <span :ref="'tooltip-span-'+scope.$index" class="tooltip-text">
                    <slot :row="scope.row" :$index="scope.$index" :column="scope.column">
                        {{ getData(scope.row, $attrs.prop) }}
                    </slot>
                </span>
            </el-tooltip>
        </template>
    </el-table-column>
</template>

<script>
import { getStyle } from "./dom";

export default {
    name: "index",
    computed:{},
    data() {
        return{
            showTooltip: {}
        }
    },
    mounted() {
        console.log(this);
    },
    methods: {
        // 如prop为 monit.memory
        // 根据 '.' 循环遍历找到row.monit.memory
        getData(row, val) {
            let data = row;
            val.split('.').forEach(item=>{
                data = data[item]
            })
            return data
        },
        //判断字段是否超出表头宽度
        isTextTooLong({column, $index}){
            // 等待cell渲染完成
            this.$nextTick(()=>{
                // 文字标签
                const span = this.$refs[`tooltip-span-${$index}`];
                // 文字标签的宽度
                const spanOffsetWidth = span.offsetWidth;
                // 父标签
                const spanFather = span.parentNode;
                // 父标签的左右padding之和
                const padding =
                    (parseInt(getStyle(spanFather, 'paddingLeft'), 0) || 0) +
                    (parseInt(getStyle(spanFather, 'paddingRight'), 0) || 0);
                // 父标签的实际宽度 = 总宽度  - padding之和
                const spanFatherOffsetWidth = column.realWidth - padding;
                // 如果文字长度超过父标签显示文字提示
                if(spanOffsetWidth >= spanFatherOffsetWidth){
                    this.$set(this.showTooltip, $index, true);
                }else{
                    this.$set(this.showTooltip, $index, false);
                }
            })
            return true;
        },
    }
}
</script>

<style scoped lang="scss">
.tooltip-text {
    white-space: nowrap !important;
    display: inline-block;
    max-width: 100%;
    height: 100%;
    overflow: hidden;
    text-overflow:ellipsis;
    vertical-align: top;
}
</style>