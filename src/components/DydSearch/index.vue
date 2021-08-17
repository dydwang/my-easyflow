<template>
    <el-row class="dyd-search">
        <el-input
            :placeholder="$attrs.placeholder || '搜索'"
            :clearable="!unSearch"
            v-model="searchInputText"
            v-bind="$attrs"
            v-on="$listeners"
            @keyup.enter="search()"
            @clear="search()">
            <el-button @click.native="search()" slot="append" icon="el-icon-search"></el-button>
        </el-input>
    </el-row>
</template>

<script>
export default {
    name: 'Index',
    components: {},
    props: {
        // 输入框默认值
        searchInputTextDefault: {
            default: '',
            type: String
        },
        // 禁止搜索
        unSearch: {
            default: false,
            type: Boolean
        }
    },
    data() {
        return {
            searchInputText: ''
        }
    },
    computed: {},
    watch: {},
    mounted() {
        this.searchInputText = this.searchInputTextDefault
    },
    created() {
    },
    methods: {
        search() {
            if(this.unSearch) return false;
            this.$emit('search', this.searchInputText)
        }
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/element-variables.scss";
.dyd-search {
    display: inline-block;
    width: 360px;
    /deep/.el-input__inner {
        border-radius:20px 0 0 20px !important;
    }
    /deep/.el-input-group__append {
        border-radius: 0 20px 20px 0  !important;
        background-color: $--color-primary;
        border-color: $--color-primary;
        overflow: hidden;
        color: #ffffff;
    }
    /deep/.el-input__clear{
        font-size: 18px !important;
    }
}
</style>

