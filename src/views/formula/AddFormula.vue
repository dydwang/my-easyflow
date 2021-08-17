<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="上传图片" prop="img_url">
            <dyd-up-img ref="upImg" :imgPath="ruleForm.img_url"></dyd-up-img>
        </el-form-item>
        <el-form-item label="配方名称" prop="formula_name">
            <el-input placeholder="请选择输入配方名称" v-model="ruleForm.formula_name"></el-input>
        </el-form-item>
        <el-form-item label="基础配方" prop="formula">
            <el-select  :disabled="!!ruleForm.id" v-model="ruleForm.formula" placeholder="请选择基础配方" style="width: 100%">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
            <el-input
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 4}"
                placeholder="请输入内容"
                v-model="ruleForm.desc">
            </el-input>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name: "add_formula",
    components: {},
    props: {},
    computed: {},
    watch: {},
    data() {
        return {
            ruleForm: {
                formula_name: null,
                formula: null,
                img_url: '',
            },
            rules: {
                formula_name: [
                    { required: true, message: '请输入配方名称', trigger: 'blur' },
                ],
                formula: [
                    { required: true, message: '请选择基础配方', trigger: 'blur' },
                ]
            }
        }
    },
    mounted() {
    },
    created() {
    },
    destroyed() {
    },
    methods: {
        render(row) {
            this.ruleForm = this.$copy(row);
        },
        submit(call) {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    this.resetForm()
                    call(true);
                } else {
                    call(false);
                    return false;
                }
            });
        },
        resetForm() {
            this.$refs['ruleForm'].resetFields();
        }
    }
}
</script>

<style scoped lang="scss">

</style>