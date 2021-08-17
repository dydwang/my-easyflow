<template>
    <el-upload
        v-bind="$attrs"
        v-on="$listeners"
        class="dyd-up-img"
        action="/api/upload"
        :show-file-list="false"
        accept=".jpg,.png,.jpeg"
        :on-success="handleAvatarSuccess">
        <img v-if="imageUrl || imgPath" :src="imageUrl || imgPath" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</template>

<script>
export default {
    name: "index",
    components: {},
    props: {
        // 默认图片地址
        imgPath: {
            type: String,
            default: ''
        }
    },
    computed: {},
    watch: {},
    data() {
        return {
            imageUrl: ''
        }
    },
    mounted() {
    },
    created() {

    },
    destroyed() {
    },
    methods: {
        handleAvatarSuccess(res, file) {
            console.log(res);
            this.imageUrl = res.data.url;
            this.$emit('success', res)
        },
    }
}
</script>

<style scoped lang="scss">
    .dyd-up-img /deep/{
        display: inline-block;
        .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .el-upload:hover {
            border-color: #409EFF;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
        }
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
            margin:  auto;
        }
    }
</style>