<template>
    <div class="dyd-table">
        <el-row class="dyd-table-search-row">
            <div class="search-row" style="display: inline-block;line-height: 40px;height: 40px">
                <slot name="search-row-before"></slot>
                <!--批量删除-->
                <el-link :underline="false" @click="deleteSelectRow" :disabled="!selectArr.length" v-if="showSelect && showDelete">
                    <span class="text">{{batchDeleteText}}</span>
                    <i class="el-icon-delete icon" />
                </el-link>
                <slot name="search-row-after"></slot>
            </div>
            <dyd-search
                style="float: right"
                :un-search="loading"
                v-on="$listeners"
                v-bind="$attrs">
            </dyd-search>
        </el-row>
        <el-table
            v-loading="loading && showLoading"
            v-bind="$attrs"
            v-on="$listeners"
            :data="data"
            stripe
            style="width: 100%"
            @selection-change="handleSelectionChange"
            ref="table"
        >
            <el-table-column
                v-if="showSelect"
                type="selection"
                width="55">
            </el-table-column>
            <slot />
            <template slot="empty">
                <dyd-null-data v-bind="$attrs" />
            </template>
        </el-table>
        <dyd-page v-if="showPage" v-show="pageForm.total > 10" :data="pageForm" v-bind="$attrs" />
    </div>
</template>

<script>
export default {
    name: 'Index',
    components: {},
    props: {
        data: { // 表格数据
            type: Array,
            default: () => []
        },
        cnt: { // 请求参数
            type: Object,
            default: () => {
                return {}
            }
        },
        pageName: { // 页面数key
            type: String,
            default: 'page_index'
        },
        sizeName: { // 每页面数据量key
            type: String,
            default: 'page_size'
        },
        pageSize: { // 分页器默认显示10条
            type: Number,
            default: 10
        },
        batchDeleteText: { // 批量删除按钮
            type: String,
            default: '删除'
        },
        showLoading: { // 是否显示加载
            default: true,
            type: Boolean
        },
        showSelect: { // 显示多选
            default: true,
            type: Boolean
        },
        showDelete: { // 显示批量删除多选
            default: true,
            type: Boolean
        }
    },
    data() {
        return {
            pageForm: {
                size: this.pageSize,
                page: 1,
                total: 0
            },
            loading: true, // 加载中
            showPage: true, // 分页器
            selectArr: [], // 选中的行
        }
    },
    computed: {
        cntAssign() {
            return Object.assign(
                this.cnt,
                {
                    [this.pageName]: this.pageForm.page,
                    [this.sizeName]: this.pageForm.size
                }
            );
        },
        watchCntAssign() {
            return JSON.stringify(this.cntAssign);
        }
    },
    watch: {
        watchCntAssign(news, olds) {
            this.getData()
        }
    },
    mounted() {
        this.getData();
        this.$nextTick(()=>{
            // this.changTooltip();
        });
    },
    created() {
    },
    methods: {
        /**
         * @params call{callback} 请求成功或失败返回结果
         * @params loading{Boolean} 是否需要加载图标
         * */
        async getData(params = {}) {
            const { call, loading } = params;
            this.loading = loading || true;
            const data = {
                cnt: this.$copy(this.cntAssign), // 请求参数
                total: (val) => { // 请求成功
                    this.pageForm.total = val
                    !call || call(true)
                    this.loading = false
                },
                overtime: () => { // 超时 或 加载失败
                    !call || call(false)
                    this.loading = false
                }
            };
            this.$emit('getData', data);
        },
        // 删除选中行
        deleteSelectRow() {
            this.$confirm('此操作将永久删除选中行, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if (this.selectArr.length) {
                    const idList = this.selectArr.map(item=>{
                        return item.id;
                    })
                    let cnt = {
                        idList,
                        selectArr: this.selectArr,
                        call: ()=>{
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.selectArr.length = 0;
                            this.getData()
                        }
                    };
                    this.$emit('delete-select',cnt);
                } else {
                    this.$message({
                        type: 'info',
                        message: '请至少选择一行'
                    });
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 选中后
        handleSelectionChange(val) {
            this.selectArr = val;
            this.$emit('select', val);
        },
        // 改变文字提示位置
        changTooltip() {
            try {
                // console.log(this.$refs.table);
                const Table = this.$refs.table;
                const TableBody = Table.$children[9];
                const TableBodyTooltip = TableBody.$refs.tooltip;
                const TableBodyTooltipPopper = TableBodyTooltip.$refs.popper;
                console.log('TableBodyTooltipPopper', TableBodyTooltip);
                TableBodyTooltipPopper.classList.add('el-table-tooltip');
            }catch (e){
                console.log(e);
            }
        }
    }
}
</script>

<style scoped lang="scss">
.dyd-table {
    .dyd-table-search-row {
        line-height: 40px;
        padding: 10px 20px;
        margin-bottom: 10px;
        background-color: #F5F7FA;
    }
    /deep/ .dyd-page {
        margin-top: 15px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content:center;
    }
    ///deep/.el-table th>.cell {
    //    line-height: 16px;
    //    font-size: 16px;
    //    color: #132233;
    //    letter-spacing: 0.56px;
    //}
    /deep/.el-table th {
        border-bottom-color: #EDF2F7;
    }
    /deep/.el-table td {
        // background-color:  rgba(57,131,250,0.10);
        border-bottom: none;
    }
    /deep/.el-table__empty-block {
        width: calc( 100% - 100px ) !important;
        margin: 50px;
    }
    /deep/.el-table__empty-text{
        width: auto;
    }
}
</style>

