import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import flow from "./modules/flow";
import getters from "./getters";
export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    flow,
  },
  getters
})
