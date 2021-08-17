import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import global from './global';
Vue.use(global);

import component from './components/index';
Vue.use(component);

import './styles/element-variables.scss';
import '@/styles/index.scss'; // global css
import Element from './components/element';
Vue.use(Element);

import directive from './directive'
Vue.use(directive)

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

