import $routerGo from './routerGo'
import $Time from './time'
import download from './download'
import toFixed from "./toFixed";

export default function(Vue) {
    Vue.prototype.$routerGo = $routerGo; /** 跳转路由*/
    Vue.prototype.$Time = function(date) { /** 获取时间*/
        return new $Time(date);
    }
    Vue.prototype.$copy = function(data) { /**  对象不指向同一地址拷贝 --深度拷贝 */
        return JSON.parse(JSON.stringify(data));
    }
    Vue.prototype.$bus = new Vue();

    Vue.prototype.$download = download; /** 下载文件*/

    Vue.prototype.$toFixed = toFixed; /** 精确小数*/
}

