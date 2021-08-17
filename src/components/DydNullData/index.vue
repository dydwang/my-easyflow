<template>
    <div class="dyd-null-data">
        <img class="null-image" src="@/assets/img/nullData.png">
        <div class="dyd-null-page-text">{{ nullDataText }}</div>
    </div>
</template>

<script>
export default {
    name: 'Index',
    components: {},
    props: {
        nullDataText: {
            type: String,
            default: '暂无数据'
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
.dyd-null-data {
    display:inline-block;
    text-align: center;
    align-self: center;
    .dyd-null-page-text {
        margin-top: 50px;
        font-size: 18px;
        color: #333333;
        letter-spacing: 0.31px;
        text-align: center;
    }
}
</style>

