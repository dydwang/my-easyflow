import RouterView from '@/layout/RouterView.vue'
export default [{
    path:'/formula',
    name:'配方管理',
    component:()=> import('@/views/formula/index.vue'),
},{
    path:'/formula/params',
    name:'调参',
    component:()=> import('@/views/formula/params/index.vue'),
    meta: {
        unMenu: true
    }
}]