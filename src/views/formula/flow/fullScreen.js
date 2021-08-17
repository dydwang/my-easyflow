import screenFull from 'screenfull';
// 全屏
export default class FullScreen {
  constructor(elem) {
    this.elem = elem;
    this.style = elem.style;
    this.isFull = false; // 是否是全屏
  }
  // 元素占浏览器全屏
  in() {
    this.style.position = 'fixed';
    this.style.width = '100vw';
    this.style.height = '100vh';
    this.style.padding = '20px';
    this.style.top = 0;
    this.style.left = 0;
    this.style.zIndex = 2001;
    this.style.background = '#ffffff';
    this.fullScreenIn()
  }
  out() {
    this.style.position = 'static';
    this.style.padding = 0;
    this.style.width = '100%';
    this.style.height = '100%';
    this.fullScreenOut();
  }
  // 浏览器占电脑全屏
  fullScreenIn() {
    screenFull.toggle();
    this.isFull = true;
    screenFull.on('change', data=>{
      console.log('change');
      // 按esc退出全屏主动触发out
      if(!screenFull.isFullscreen && this.isFull ) {
        this.out();
        this.isFull = false;
      }
    })
  }
  fullScreenOut(){
    screenFull.exit();
    this.isFull = false;
  }
}
