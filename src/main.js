import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// 通过在vue原型上定义$bus，使其在每个 Vue 的实例中可用。
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  // 挂载路由
  router,
}).$mount('#app')
