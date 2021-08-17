// 外部指令
import vClickOutside from 'v-click-outside'


// 自动化注册指令
const files = require.context('./', true, /\.js$/);
export default function (Vue){
    Vue.use(vClickOutside);
    files.keys().forEach(fileName=>{
        if(fileName !== './index.js'){
            const { directiveKey, directiveData } = files(fileName).default;
            Vue.directive(directiveKey, directiveData);
        }
    })
}