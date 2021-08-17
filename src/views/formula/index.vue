<template>
    <div class="formula">
        <dyd-table
            :data="tableData"
            :cnt="cnt"
            ref="table"
            @search="search"
            @getData="getList"
            @delete-select="deleteSelect">
            <template #search-row-before>
                <span style="margin-right: 10px">
                    <el-link :underline="false" @click="$refs.add.show = true">
                        <span class="text">新建</span>
                        <i class="el-icon-plus icon" />
                    </el-link>
                </span>
            </template>

            <el-table-column prop="id" label="id" ></el-table-column>
            <dyd-table-column prop="formula_name" label="配方名" align="left" header-align="left"></dyd-table-column>
            <el-table-column prop="desc" label="描述" ></el-table-column>
            <dyd-table-column prop="img_url" label="图片地址" ></dyd-table-column>

            <el-table-column label="操作" width="280" class="edit-row">
                <template v-slot="scope">
                    <el-button type="text" @click="">复制</el-button>

                    <el-button type="text" @click="$routerGo('/formula/params', scope.row)">调参</el-button>

                    <el-button style="margin-left: 10px" type="text" @click="editFormula(scope.row)">编辑</el-button>

                    <el-popconfirm title="确认删除配方吗？"  @confirm="">
                        <el-button slot="reference" style="margin-left: 10px" type="text">删除</el-button>
                    </el-popconfirm>


                    <el-popconfirm title="确认把配方应用到现场吗？"  @confirm="">
                        <el-button slot="reference" style="margin-left: 10px" type="text" >应用到现场</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </dyd-table>

        <dyd-dialog ref="add" title="新建配方"  @submit="call => $refs['add-formula'].submit(call)" @cancel="$refs['add-formula'].resetForm()">
            <add-formula ref="add-formula"></add-formula>
        </dyd-dialog>
    </div>
</template>

<script>
import AddFormula from "./AddFormula";
export default {
    name: "index",
    components: {AddFormula},
    props: {},
    computed: {
        cnt() {
            return {

            }
        }
    },
    watch: {},
    data() {
        return {
            tableData: [],
        }
    },
    mounted() {
    },
    created() {
    },
    destroyed() {
    },
    methods: {
        // 获取列表
        getList({ total }) {
            this.tableData = [{id: 123456, formula_name: '配方', img_url:'http://192.168.0.173:10005/uploads/6d4a3670-ea9c-11eb-8273-f1732f0d846f.png'}];
            total(0);
        },
        // 搜索
        search() {

        },
        // 删除选中行
        deleteSelect({idList, call}) {
            console.log(cnt);
        },
        editFormula(row) {
            this.$refs.add.show = true;
            this.$nextTick(()=>{
                this.$refs['add-formula'].render(row);
            })
        }
    }
}
</script>

<style scoped lang="scss">
    .formula {

    }
</style>