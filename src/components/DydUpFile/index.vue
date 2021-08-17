<template>
    <div class="dyd-up-file">
        <el-upload
            class="upload-demo"
            drag
            :action="action"
            multiple
        >
            <i class="el-icon-upload" />
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </div>
</template>

<script>
export default {
    name: 'Index',
    components: {},
    props: {
        action: {

        }
    },
    data() {
        return {}
    },
    computed: {},
    watch: {},
    mounted() {
    },
    created() {
    },
    methods: {}
}
</script>

<style scoped lang="scss">
.dyd-up-file {
}
</style>

