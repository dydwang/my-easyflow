import Vue from 'vue'
import VueRouter from 'vue-router'
import formulaRouter from './modules/formula'
import layout from '@/layout'
Vue.use(VueRouter)
const routes = [
    {
        path:'/',
        name:'首页',
        redirect:'/formula',
        component:layout,
        children: [
            ...formulaRouter,
        ]
    }
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router
export { routes }