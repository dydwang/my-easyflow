import DydTitle from './DydTitle' // 竖线标题
import DydPage from './DydPage' // 分页器
import DydTable from './DydTable' // 表格
import DydTableColumn from './DydTableColumn' // 表格列
import DydNullData from './DydNullData' // 空数据
import DydDialog from './DydDialog' // 弹框
import DydUpFile from './DydUpFile' // 上传文件
import DydEditText from './DydEditText' // 编辑文字
import DydFile from './DydFile' // 树形文件
import DydDrawer from './DydDrawer' // 抽屉
import DydSearch from './DydSearch' // 搜索
import DydUpImg from './DydUpImg' // 上传图片
const publicTitle = {
  install: function(Vue) {
    Vue.component('DydTitle', DydTitle);
    Vue.component('DydPage', DydPage);
    Vue.component('DydTable', DydTable);
    Vue.component('DydTableColumn', DydTableColumn);
    Vue.component('DydNullData', DydNullData);
    Vue.component('DydDialog', DydDialog);
    Vue.component('DydUpFile', DydUpFile);
    Vue.component('DydEditText', DydEditText);
    Vue.component('DydFile', DydFile);
    Vue.component('DydDrawer', DydDrawer);
    Vue.component('DydSearch', DydSearch);
    Vue.component('DydUpImg', DydUpImg);
  }
}
export default publicTitle
