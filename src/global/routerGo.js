export default function routerGo(newPath, newQuery = '', callback) {
    const oldPath = this.$route.fullPath
    const oldQuery = this.$route.query
    const cnt = {
        oldPath: oldPath,
        oldQuery: oldQuery,
        newPath: newPath,
        newQuery: newQuery
    }
    if (oldPath !== newPath) {
        // 路由不同时
        this.$router.push({
            path: newPath,
            query: newQuery
        })
    } else if (newQuery) {
        // 路由不改变   传值改变时
        this.$router.push({
            query: newQuery
        })
    }
    // 是否需要回调函数
    // 等待页面渲染完开始回调
    !callback || setTimeout(() => {
        callback(cnt)
    })
}
