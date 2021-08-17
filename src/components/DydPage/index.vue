<template>
    <div class="dyd-page">
        <el-pagination
            :current-page="data.page"
            :page-size="data.size"
            layout="slot, prev, pager, next, jumper "
            :total="data.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        >
      <span style="margin-right: 60px">
        共{{ currentPage }}页
      </span>

            <span style="margin-right: 60px">
        每页<span>
          <el-select v-model="data.size" placeholder="请选择" size="mini" @change="handleSizeChange">
            <el-option
                v-for="item in pageSizes"
                :key="item"
                :label="item"
                :value="item"
            />
          </el-select>
        </span>条
      </span>
        </el-pagination>
    </div>
</template>

<script>
export default {
    name: 'Index',
    components: {},
    props: {
        data: {
            type: Object,
            default: () => {
                return {
                    size: 10,
                    page: 1,
                    total: 0
                }
            }
        }
    },
    data() {
        return {
            currentPage: 1,
            pageSizes: [10, 20, 50, 100]

        }
    },
    computed: {},
    watch: {},
    mounted() {
    },
    created() {
    },
    methods: {
        handleSizeChange(val) {
            console.log('change')
            this.$emit('change')
        },
        handleCurrentChange(val) {
            console.log('change')
            this.$emit('change')
        }
    }
}
</script>

<style scoped lang="scss">
.dyd-page /deep/{
    display: inline-block;

    /deep/ .el-pagination__jump {
        margin-left: 60px;
    }
}
</style>

