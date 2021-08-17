<template>
    <el-container class="container">
        <el-main class="router-view-main">
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script>
import { routes } from '@/router/index'
import Submenu from "./submenu.vue";
export default {
    components:{
        Submenu
    },
    data() {
        return{
            // active: this.$route.path || '/formula',
            menuList: [],
            menuListPath:[]
        }
    },
    computed:{
        active() {
            if(this.menuListPath.indexOf(this.$route.path) > -1){
                return this.$route.path
            }else{
                return this.menuListPath.filter(path=>{
                    return this.$route.path.indexOf(path) > -1
                })[0]
            }
        }
    },
    created() {
      this.getMenuList()
    },
    mounted() {
        console.log(this.$refs.menu);
    },
    methods: {
        handleOpen(data) {

        },
        handleClose() {

        },
        selectMenu() {

        },
        getMenuList() {
            const xun = (arr) => {
                return arr.filter(item=>{
                    if(!(item.meta && item.meta.unMenu)) {
                        if(item.children) {
                            item.children = xun(item.children);
                        }
                        this.menuListPath.push(item.path)
                        return true;
                    }else{
                        return false;
                    }
                })
            }
            this.menuList = xun(routes[0].children);
        },
    },
}
</script>

<style scoped lang="scss">
    .container {
        height: 100vh;
        width: 100%;
        .header {
            background: #545c64;
            overflow: hidden;
            .header-title {
                line-height: 56px;
                color: #ffffff;
                font-size: 18px;
            }
            .el-menu.el-menu--horizontal {
                border-bottom: 0;
            }
        }
        .router-view-main {
            background-color: #ffffff;
            // background-color: rgba(244, 244, 245, .4);
        }
    }
</style>