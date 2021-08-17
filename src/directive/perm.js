// 动态权限指令
export default {
    directiveKey: 'perm',
    directiveData: {
        // inserted: ((el, binding) => {
        //     const value = binding.value;
        //     // el.parentNode.removeChild(el) 不显示该标签
        // })
        bind: function (el, binding, vnode) {
            // console.log('bind', arguments);
        },
        inserted: function () {
            // console.log('inserted', arguments);
        },
        update: function () {
            // console.log('update', arguments);
        },
        componentUpdated: function () {
            // console.log('componentUpdated', arguments);
        },
        unbind: function () {
            // console.log('unbind', arguments);
        }
    }
}