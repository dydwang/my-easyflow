<template>
    <div class="dyd-file" :style="style">
        <dyd-search @search="val => $refs.tree.filter(val)"></dyd-search>
        <el-tree :data="list" ref="tree" v-bind="$attrs"  v-on="$listeners" :filter-node-method="filterNode">
      <span slot-scope="{ node, data }" class="custom-tree-node">
        <span :class=" isFolder(node, data) ? 'is-folder-spot': 'is-file-spot'"></span>
        <span :class=" isFolder(node, data) ? 'is-folder': 'is-file'">{{ node.label }}</span>
          <!--        <el-button type="text" class="el-icon-more"></el-button>-->
      </span>
        </el-tree>
    </div>
</template>

<script>
export default {
    name: 'Index',
    components: {},
    props: {
        width: {
            default: '100%',
            type: String
        },
        height: {
            default: '100%',
            type: String
        },
        // 是否是文件夹
        isFolder: {
            default: (node, data) => data.type === 1,
            type: Function
        },
        filterNode:{
            default: (value, data) => {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            type: Function
        },
    },
    data() {
        return {
            filterText: null, // 搜索框
            style: {
                width: this.width,
                height: this.height
            },
            selectNode: {},
            list: [{
                type: 1,
                label: '一级 1',
                children: [{
                    label: '二级 1-1',
                    children: [{
                        label: '三级 1-1-1'
                    }]
                }]
            }, {
                type: 1,
                label: '一级 2',
                children: [{
                    label: '二级 2-1',
                }, {
                    type: 1,
                    label: '二级 2-2',
                    children: [{
                        label: '三级 2-2-1'
                    }]
                }]
            }]
        }
    },
    computed: {

    },
    watch: {},
    mounted() {
    },
    created() {
    },
    methods: {}
}
</script>

<style scoped lang="scss">
.dyd-file /deep/{
    .el-tree-node__expand-icon{
        display: none;
    }
    .el-tree-node__content{
        display: inline-block;
        height: auto;
        width: 100%;
    }
    .custom-tree-node {
        height: 34px;
        display: inline-block;
        line-height: 34px;
    }
    .el-icon-more {
        position: absolute;
        right: 5px;
    }
    .is-file-spot,
    .is-folder-spot{
        width: 6px;
        height: 6px;
        display: inline-block;
        margin-right: 10px;
        margin-left: 20px;
    }
    .is-folder-spot{
        background: #BEBEBE;
        border-radius: 7px;
        display: inline-block;
        position: relative;
        top: -3px;
    }
    .is-folder,
    .is-file{
        font-size: 14px;
    }
    .is-folder {
        color: #132233;
        font-weight: 600;
    }
}
</style>
