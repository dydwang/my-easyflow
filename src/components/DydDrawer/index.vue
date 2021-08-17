<template>
    <el-drawer
        class="dyd-drawer"
        v-bind="$attrs"
        v-on="$listeners"
        direction="rtl"
        :visible.sync="show"
        :size="size || '520px'"
    >
        <template #title>
            <div class="title">
                <slot name="title">
                    {{ title }}
                </slot>
            </div>
        </template>
        <div class="line" />
        <div class="main-box">
            <slot v-if="show" />
        </div>
        <slot name="bottom">
            <div class="form-button">
                <el-button class="cancel" v-if="cancelText" type="" @click="show = false">{{ cancelText }}</el-button>
                <el-button type="primary" v-if="submitText" :disabled="isClick" @click="submit">{{ submitText }}</el-button>
            </div>
        </slot>
    </el-drawer>
</template>

<script>
export default {
    name: 'Index',
    components: {},
    props: {
        // eslint-disable-next-line vue/require-default-prop,vue/require-prop-types
        size: {},
        // 顶部标题
        // eslint-disable-next-line vue/require-default-prop
        title: {
            type: String
        },
        // 确认文字
        submitText: {
            type: String,
            default: '确认'
        },
        // 取消文字
        cancelText: {
            type: String,
            default: '取消'
        }
    },
    data() {
        return {
            show: false,
            isClick: false
        }
    },
    computed: {},
    watch: {
        show(news) {
            if (!news) {
                this.isClick = false
            }
        }
    },
    mounted() {},
    created() {},
    destroyed(){},
    methods: {
        submit() {
            this.isClick = true
            const call = (unClose = true) => {
                this.isClick = false
                // 是否关闭抽屉
                this.show = !unClose
            }
            // 父组件接收submit时需要回调使提交按钮能再次点击
            if (this.$listeners.submit){
                this.$emit('submit', call)
            }else {
                call()
            }
        }
    }
}
</script>

<style scoped lang="scss">
.dyd-drawer {
    .title {
        text-align: center;
    }
    .line {
        width: 100%;
        height: 10px;
        background-color: #F7F8FA;;
    }
    .main-box {
        padding: 20px;
        height: calc(100vh - 140px);
        overflow: auto;
    }
    /deep/.el-drawer__header{
        padding: 0;
        margin: 0;
        height: 56px;
        line-height: 56px;
        font-weight: 600;
        font-size: 18px;
        color: #132233;
        letter-spacing: 1px;
    }
    /deep/.el-drawer__close-btn {
        position: absolute;
        right: 10px;
    }
}

/deep/ :focus {
    outline: 0;
}
</style>

