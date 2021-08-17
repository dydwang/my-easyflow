<template>
    <span class="submenu">
        <el-submenu :index="fatherPaths+item.path" v-if="item.children && item.children.length">
            <template #title>{{ item.name }}</template>
            <span v-for="(ite, index) in item.children" :key="index">
                <submenu  :item="ite" :fatherPath="fatherPaths + item.path" class="is-submenu"></submenu>
            </span>
        </el-submenu>
        <el-menu-item v-else-if="!(item.meta && item.meta.unMenu)" :index="fatherPaths+item.path">
            <template #title>{{ item.name }}</template>
        </el-menu-item>
    </span>
</template>

<script>
import Submenu from './submenu'
export default {
    name: 'submenu',
    components: {Submenu},
    props:{
        item: Object,
        fatherPath: {
            default: "",
            type: String
        }
    },
    computed: {
        fatherPaths() {
            return this.fatherPath ? (this.fatherPath + '/') : ""
        },
    },
}
</script>

<style scoped lang="scss">
.submenu /deep/{
    // display: inline-block;
    .el-menu-item,
    .el-submenu{
        display: inline-block !important;
    }
    .el-submenu__icon-arrow {
        position: static;
        margin-left: 5px;
        margin-top: -3px;
    }
}
.is-submenu /deep/{
    .el-menu-item {
        width: 100%;
        display: block !important;
    }
}

</style>