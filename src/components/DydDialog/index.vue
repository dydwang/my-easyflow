<template>
    <el-dialog
        class="dyd-dialog"
        v-bind="$attrs"
        :title="title"
        :visible.sync="show"
        :width="$attrs.width || '520px'"
        :before-close="handleClose"
    >
        <slot />

        <div class="form-button">
            <el-button class="cancel" type="" @click="cancel">取消</el-button>
            <el-button type="primary" :disabled="isClick" @click="submit()">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: 'Index',
    components: {},
    props: {
        handleClose: {
            type: Function,
            default: (done) => {
                done()
            }
        },
        title: {
            type: String,
            default: '标题'
        }
    },
    data() {
        return {
            show: false,
            isClick: false
        }
    },
    computed: {},
    watch: {},
    mounted() {
    },
    created() {
    },
    methods: {
        submit() {
            if(this.$listeners.submit) {
                this.isClick = true;
            }
            this.$emit('submit', () => {
                this.isClick = false
            })
        },
        cancel() {
            this.show = false;
            this.isClick = false;
            this.$emit('cancel')
        }
    }
}
</script>

<style scoped lang="scss">
.dyd-dialog /deep/{
    .el-dialog__header{
        text-align: center;
        .el-dialog__title {
            font-size: 20px;
            color: #333333;
            letter-spacing: 0.8px;
            font-weight: bold;
            line-height: 20px;
        }
    }
    .el-dialog__headerbtn {
        font-size: 20px;
        margin-top: -5px;
    }
    .form-button {
        margin: 0 auto;
        padding-top: 10px;
        //width: 463px;
        height: 70px;
        text-align: center;
        /*.dialog-footer-button{*/
        /*  width: 120px;*/
        /*}*/
        .el-button {
            width: 220px;
        }
        .el-button+.el-button {
            margin-left: 23px;
        }
        .cancel {
            color: #40a9ff;
        }
    }
    .el-dialog__body {
        padding-bottom: 0;
    }
}
</style>

