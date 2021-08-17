<template>
    <div class="right-menu">
        <div class="zoom-size">
            {{parseInt(zoom * 100) }}%
        </div>
        <el-tooltip class="item"  effect="dark" content="放大" placement="top">
            <div class="el-icon-zoom-in icon" :class="{'unClickSize': zoom  >= 1.3 }" @click="changeZoom(0.1)"></div>
        </el-tooltip>
        <el-tooltip class="item"  effect="dark" content="缩小" placement="top">
            <div class="el-icon-zoom-out icon" :class="{'unClickSize': zoom  <= 0.7 }" @click="changeZoom(-0.1)"></div>
        </el-tooltip>
        <el-tooltip class="item" effect="dark"  :content="fullScreen.isFull ? '退出全屏':'全屏'" placement="top">
            <div class="el-icon-full-screen icon" @click="clickFullScreen()"></div>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="中点" placement="top">
            <div class="el-icon-location-information icon" @click="$emit('scrollIntoView')"></div>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="自动布局" placement="top">
            <div class="iconfont dyd-iconzhengli_zuzhi icon" @click="autoLayout()"></div>
        </el-tooltip>
    </div>
</template>

<script>
import FullScreen from "./fullScreen";
import { mapMutations, mapGetters }  from 'vuex';
import {dataReload, repaintEverything} from "./jsplumbMethods";
export default {
    name: 'rightMenu',
    props: ['jsPlumb'],
    components: {},
    data() {
        return {
            zoom: 1,
            fullScreen: {},
        }
    },
    computed: {
        ...mapGetters(['jsPlumbInstance']),
        unClickSize() {
            return this.zoom  > 1.3 || this.zoom  < 0.7
        }
    },
    watch: {},
    mounted() {
        this.$nextTick(()=>{
            let paramsFlow = document.getElementById('params-flow');
            this.fullScreen = new FullScreen(paramsFlow);
        })
    },
    created() {
    },
    methods: {
        ...mapMutations(['AUTO_NODE']),
        // 改变画布缩放
        changeZoom(multiple) {
            if ( (this.zoom  >= 1.3 && multiple > 0) || (this.zoom  <= 0.7 && multiple<0)) {
                return false;
            }
            // 缩放系数
            multiple > 0 ? this.zoom += 0.1 : this.zoom -= 0.1
            this.zoom = Number(this.zoom.toFixed(1));

            const efContainerRef = this.$parent.$refs.efContainer;
            // 移动系数x
            // 2x · zoom + zoom = 1
            // x = ( 1 -zoom ) / 2zoom
            // 0.9 5.55555...%; 0.8 12.5% ; 0.7 21.428...%
            // 缩放偏移量
            const translate = -((1 - this.zoom) / (2 * this.zoom)) * 100 + '%';
            // 缩放 偏移
            efContainerRef.style.transform = `scale(${this.zoom}) translate(${translate}, ${translate})`;
            efContainerRef.style.width = 100 * ( 1 / this.zoom) + '%';
            efContainerRef.style.height = 100 * ( 1 / this.zoom) + '%';
            // 流程图缩放
            this.jsPlumbInstance.setZoom(this.zoom);
            // 修改滚动条宽高
            this.$emit('changeRoom', this.zoom);
        },
        clickFullScreen() {
            this.fullScreen.isFull ? this.fullScreen.out() : this.fullScreen.in()
        },
        autoLayout() {
            this.AUTO_NODE();
            // 重新加载界面
            this.$parent.dataReload();
        }
    },
}
</script>

<style scoped lang="scss">
.right-menu {
    position: absolute;
    right: 20px;
    bottom: 10px;
    z-index: 1;
    .icon {
        font-size: 18px;
        background-color: #ffffff;
        padding: 3px;
        cursor: pointer;
        margin: 0 2px;
        width: 24px;
        float: left;
        :first-child{
            margin-left: 0;
        }
        :last-child{
            margin-right: 0;
        }
    }
    .unClickSize {
        cursor: no-drop !important;
    }
    .zoom-size {
        float: left;
        height: 24px;
        line-height: 24px;
        color: #6694dc;
        display: inline-block;
        font-size: 14px;
    }
}
</style>

