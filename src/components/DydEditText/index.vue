<template>
    <div class="dyd-edit">
        <!--@mouseout="showEdit = false"-->
        <div v-show="!clickEdit" class="dyd-edit-text" @mouseover="showEdit = true" @mouseout="showEdit = false">
      <span style="overflow: hidden;display: inline-block;max-width: 100%">
        <slot />
      </span>
            <div class="icon-box">
                <el-link v-show="showEdit" :underline="false" class="el-icon-edit icon" @click="onClickEdit" />
            </div>
        </div>

        <el-input
            v-show="clickEdit"
            ref="edit-input"
            v-model="vModel"
            :placeholder="placeholder"
            :size="inputSize"
            v-bind="$attrs"
            @focus="inputFocus"
            @blur="inputBlur"
            @compositionstart="compositionstart"
            @keydown.native="e => inputText(''+vModel, e)"
        />
    </div>
</template>

<script>
export default {
    name: 'Index',
    components: {},
    // props: ['placeholder','model'],
    props: {
        placeholder: {
            type: String,
            default: '输入内容回车修改'
        },
        model: {
            type: String
        },
        // 是否可为空
        isNull: {
            type: Boolean,
            default: false
        },
        longSize: {
            type: Number
        },
        smallSize: {
            type: Number
        },
        inputSize: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            showEdit: false,
            clickEdit: false,
            copyModel: this.model,
            showMessage: true
        }
    },
    computed: {
        vModel: {
            get: function() {
                return this.copyModel
            },
            set: function(value) {
                this.copyModel = value
            }
        }
    },
    watch: {
        model() {
            this.copyModel = this.model
        }
    },
    mounted() {
        this.copyModel = this.model
    },
    created() {
    },
    methods: {
        compositionstart() {
            console.log('拼音')
        },
        inputText(val, e) {
            // e.preventDefault()
            setTimeout(() => {
                console.log(e.target.value)
                const { nativeInputValue, value } = this.$refs['edit-input']
                // console.log(this.$refs['edit-input']);
                // console.log(nativeInputValue, value);
                // console.log(val, this.copyModel, this.copyModel.length);
                if (e.keyCode === 229 && this.copyModel.length === this.longSize && e.target.value.length < this.copyModel.length) {
                    console.log('正在输入中文')
                    this.showMessage = false
                    this.$nextTick(() => {
                        this.showMessage = true
                    })
                }
                if (val === this.copyModel && this.longSize && this.copyModel.length === this.longSize && this.showMessage) {
                    this.$message(`输入字符长度最多` + this.longSize)
                    this.showMessage = false
                }
            }, 50)
        },
        onClickEdit() {
            this.$emit('clickEdit')
            this.clickEdit = true
            setTimeout(() => {
                this.$refs['edit-input'].$refs.input.focus()
            })
        },
        searchInput() {
            this.clickEdit = false
            console.log(this.vModel.length)
            if (this.longSize && (this.vModel.length > this.longSize)) {
                this.$message(`输入字符长度最多` + this.longSize)
                this.vModel = this.model
            } else if (this.smallSize && (this.vModel.length < this.smallSize)) {
                this.$message(`输入字符长度至少` + this.smallSize)
                this.vModel = this.model
            } else if (this.vModel !== this.model) {
                this.$emit('enter', this.vModel)
            }
        },
        // 获得焦点时触发
        inputFocus() {
            // 按下回车
            document.onkeyup = (even) => {
                const e = window.event || even
                const code = e.keyCode || e.which || e.charCode
                if (code === 13) {
                    console.log('回车', this.clickEdit)
                    if (!this.isNull) {
                        if (this.vModel) {
                            this.searchInput()
                        } else {
                            this.$message.info('请输入内容')
                        }
                    } else {
                        this.searchInput()
                    }
                }
            }
        },
        // 失去焦点
        inputBlur() {
            console.log('失去焦点', this.clickEdit)
            this.showMessage = true
            this.$emit('blur')
            if (!this.isNull) {
                if (this.vModel) {
                    document.onkeyup = null
                    if (this.clickEdit) {
                        this.searchInput()
                    }
                } else {
                    this.$message.info('请输入内容')
                }
            } else {
                if (this.clickEdit) {
                    this.searchInput()
                }
            }
        }
    }
}
</script>

<style scoped lang='scss'>
.dyd-edit {
    max-width: 100%;
    display: inline-block;
    .icon-box {
        height: 19px;
        width: 19px;
        float: left;
        display: inline-block;
        position: absolute;
        z-index: 3000;
    }
    .icon {
        position: relative;
        top: -2px;
        left: 5px;
    }
}
</style>
