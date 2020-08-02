import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 安装vuex插件功能
Vue.use(Vuex)


const state = {
  cartList: []
}

// 创建Vuex对象store
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})


// 导出Vuex对象store，并挂载到vue实例上
export default store